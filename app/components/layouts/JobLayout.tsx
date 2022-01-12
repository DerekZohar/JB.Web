import { Menu, Tab, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  FilterIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";
import { jobAPI } from "app/api/modules/jobAPI";
import SearchJob from "app/components/atoms/SearchBar/SearchJob";
import helper from "app/utils/helper";
import { usePrevious } from "app/utils/hooks";
import router, { useRouter } from "next/router";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Filters from "../molecules/Filters";
import JobInfinityScroll from "../molecules/JobInfinityScroll";
import LoadingFullPage from "../molecules/LoadingFullPage";
import MobileFilterDialog from "../molecules/MobileFilterDialog";
import Head from "next/head";
import { toast } from "react-toastify";
import Link from "next/link";

const sortOptions = [
  { name: "Default", href: "default", current: false },
  { name: "Newest", href: "newest", current: false },
  { name: "Oldest", href: "oldest", current: false },
];
const categories = [
  { title: "Browse All", path: "/" },
  { title: "Recommend", path: "/rec" },
  { title: "Remote Job", path: "/rec" },
];

// const salaryOptions = [
//   { name: "All", value: [] },
//   { name: "$500", value: [0, 500] },
//   { name: "$500 - $1000", value: [500, 1000] },
//   { name: "$1000 - $2000", value: [1000, 2000] },
//   { name: "$2000 - $3000", value: [2000, 3000] },
//   { name: ">= $3000", value: [0, 3000] },
// ];
export default function Job() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [jobs, setJobs] = useState<any>([]);

  const [page, setPage] = useState(1);
  const [filterOptions, setFilterOptions] = useState({
    categories: [],
    skills: [],
    positions: [],
    types: [],
  });

  // const [isLoadMore, setIsLoadMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [filterOptionsInput, setFilterOptionsInput] = useState({
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
    if (keyword === "") {
      setFilterOptionsInput({
        ...filterOptionsInput,
        keyword,
        page: 1,
      });
    }
    let temp = keyword.trim();
    if (temp.length > 0 || jobs.length === 0) {
      setFilterOptionsInput({
        ...filterOptionsInput,
        page: 1,
        keyword,
      });
    }
  };

  const handleFilter = (values: any) => {
    setFilterOptionsInput({ ...filterOptionsInput, ...values });
  };

  useMemo(() => {
    const fetchData = async () => {
      setLoading(true);
      Promise.all([
        jobAPI.getAll(filterOptionsInput),
        jobAPI.getJobProperties(),
      ])
        .then(([res, res2]) => {
          if (res.status === 200) setJobs(res.data.data.jobs);
          if (res2.status === 200)
            setFilterOptions(res2.data.data.jobProperties);

          setLoading(false);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, []);

  useEffect(() => {
    const newFilter = { ...filterOptionsInput };
    const query = router.query;

    if (query.sort) {
      if (query.sort === "default") {
        newFilter.sortBy = "";
      }
      if (query.sort === "newest") {
        newFilter.sortBy = "createdDate";
        newFilter.isDescending = true;
      }
      if (query.sort === "oldest") {
        newFilter.sortBy = "createdDate";
        newFilter.isDescending = false;
      }
    }

    if (page === 1) {
      setLoading(true);
      jobAPI
        .getAll({ ...newFilter, page: 1 })
        .then((res) => {
          if (res.status === 200) setJobs(res.data.data.jobs);
          setLoading(false);
        })
        .catch((err) => console.log(err.response.status));
    } else if (page > 1) {
      jobAPI
        .getAll({
          ...newFilter,
          page: page,
        })
        .then((res) => {
          if (res.status === 200) setJobs([...jobs, ...res.data.data.jobs]);

          setHasMore(res.data.data.jobs.length > 0);
        });
    }
  }, [filterOptionsInput, page, router.query]);
  return (
    <div className="bg-white">
      <Head>
        <title>Job | JobBucket</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>
        {/* Mobile filter dialog */}
        <MobileFilterDialog
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
          filters={[]}
        />
        <div className="flex justify-center">
          <SearchJob
            styles="lg:w-1/2 w-5/6 mx-8 px-2 py-1 hover:shadow-lg"
            handleSearch={handleSearch}
            // handleReset={handleReset}
          />
        </div>
        <main className=" px-4 sm:px-6 lg:px-16">
          <div className="relative z-10 flex items-baseline justify-between pt-4 pb-6 border-b border-gray-200">
            <h1 className="hidden lg:block  text-xl font-medium text-center text-gray-900">
              Filters
            </h1>

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
                            <Link
                              href={{
                                pathname: "job",
                                query: { sort: option.href },
                              }}
                              passHref
                            >
                              <p
                                className={helper.classNames(
                                  option.current
                                    ? "font-medium text-gray-900"
                                    : "text-gray-500",
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm cursor-pointer"
                                )}
                              >
                                {option.name}
                              </p>
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

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

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-10">
              {/* Filters */}
              <Filters
                filters={[
                  {
                    id: "Cities",
                    name: "Cities",
                    options: [
                      { id: "Ho Chi Minh", name: "Ho Chi Minh" },
                      { id: "Ha Noi", name: "Ha Noi" },
                    ],
                  },
                  {
                    id: "Skills",
                    name: "Skill",
                    options: filterOptions.skills,
                  },
                  {
                    id: "Positions",
                    name: "Position",
                    options: filterOptions.positions,
                  },
                  {
                    id: "Types",
                    name: "Type",
                    options: filterOptions.types,
                  },
                  {
                    id: "Category",
                    name: "Category",
                    options: filterOptions.categories,
                  },
                  // {
                  //   id: "Salary",
                  //   name: "Salary",
                  //   options: salaryOptions,
                  // },
                ]}
                callback={handleFilter}
              />
              {/* Product grid */}
              <div className="lg:col-span-9">
                <JobInfinityScroll
                  setPage={() => setPage(page + 1)}
                  hasMore={hasMore}
                  loading={loading}
                  jobs={jobs}
                  // filterOptions={filterOptionsInput}
                  // setFilterOptions={setFilterOptionsInput}
                />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
