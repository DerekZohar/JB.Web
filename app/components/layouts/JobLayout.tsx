import { Menu, Tab, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  FilterIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";
import { jobAPI } from "app/api/modules/jobAPI";
import SearchJob from "app/components/atoms/SearchJob";
import helper from "app/utils/helper";
import router from "next/router";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Filters from "../molecules/Filters";
import JobInfinityScroll from "../molecules/JobInfinityScroll";
import MobileFilterDialog from "../molecules/MobileFilterDialog";

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

const filters = [
  {
    id: "Level",
    name: "Level",
    options: [
      { value: "Fresher", label: "Fresher", checked: false },
      { value: "Junior", label: "Junior", checked: false },
      { value: "Middle", label: "Middle", checked: true },
      { value: "Senior", label: "Senior", checked: false },
      { value: "Director", label: "Director", checked: false },
      { value: "PM", label: "PM", checked: false },
    ],
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "new-arrivals", label: "New Arrivals", checked: false },
      { value: "sale", label: "Sale", checked: false },
      { value: "travel", label: "Travel", checked: true },
      { value: "organization", label: "Organization", checked: false },
      { value: "accessories", label: "Accessories", checked: false },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "2l", label: "2L", checked: false },
      { value: "6l", label: "6L", checked: false },
      { value: "12l", label: "12L", checked: false },
      { value: "18l", label: "18L", checked: false },
      { value: "20l", label: "20L", checked: false },
      { value: "40l", label: "40L", checked: true },
    ],
  },
];
const categories = [
  { title: "Browse All", path: "/" },
  { title: "Recommend", path: "/rec" },
  { title: "Remote Job", path: "/rec" },
];

export default function Job() {
  const user = useSelector((state: any) => state.user);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [jobs, setJobs] = useState<any>([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    isDescending: false,
    page: 1,
    size: 10,
    sortBy: "",
    keyword: "",
    numberEmployeesToApplied: [],
    createdDate: [],
    expireDate: [],
    skill: [],
    position: [],
    salary: [],
  });

  const handleSearch = (keyword: string) => {
    setFilterOptions({
      ...filterOptions,
      keyword,
    });
    setIsFiltered(!isFiltered);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await jobAPI.getAll(filterOptions, user.token);
      if (res.status === 200) setJobs(res.data.data.jobs);
    };
    fetchData();
  }, [isFiltered]);

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <MobileFilterDialog
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
          filters={filters}
        />
        <div className="flex justify-center">
          <SearchJob
            styles="lg:w-1/2 w-5/6 mx-8 px-2 py-1 hover:shadow-lg"
            handleSearch={handleSearch}
          />
        </div>
        <main className=" px-4 sm:px-6 lg:px-16">
          <div className="relative z-10 flex items-baseline justify-between pt-4 pb-6 border-b border-gray-200">
            <h1 className="hidden lg:block  text-xl font-medium text-center text-gray-900">
              Filters
            </h1>
            <div className="w-full max-w-md px-2 ">
              <Tab.Group>
                <Tab.List className="flex p-1 space-x-1 bg-gray-900/20 rounded-xl">
                  {categories.map((category, index) => (
                    <Tab
                      onClick={() => router.push(category.path)}
                      key={index}
                      className={({ selected }) =>
                        helper.classNames(
                          "w-full py-2.5 text-sm leading-5 font-medium rounded-lg",
                          "focus:outline-none ",
                          selected
                            ? "text-blue-600 bg-white shadow font-semibold"
                            : "text-gray-600 hover:bg-gray-600/[0.12] hover:text-white"
                        )
                      }
                    >
                      {category.title}
                    </Tab>
                  ))}
                </Tab.List>
              </Tab.Group>
            </div>
            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={helper.classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              <button
                type="button"
                className="p-2 -m-2 ml-5 sm:ml-7 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">View grid</span>
                <ViewGridIcon className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FilterIcon className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                {/* <FilterIcon className="w-5 h-5" aria-hidden="true" /> */}
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-10 gap-x-8 gap-y-10">
              {/* Filters */}
              <Filters
                filters={filters}
                callback={() => setIsFiltered(!isFiltered)}
              />
              {/* Product grid */}
              <div className="lg:col-span-8">
                {/* Replace with your content */}
                {/* <InfiniteScroll
                  dataLength={jobs.length}
                  next={fetchMoreData}
                  hasMore={hasMore}
                  loader={<h4>Loading...</h4>}
                  scrollableTarget="scrollableDiv"
                  className="flex flex-col gap-4 p-4"
                >
                  {jobs.map((item, index) => (
                    <JobHorizonCard key={index} {...item} />
                  ))}
                </InfiniteScroll> */}
                <JobInfinityScroll
                  jobs={jobs}
                  setJobs={setJobs}
                  filterOptions={filterOptions}
                  setFilterOptions={setFilterOptions}
                />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}