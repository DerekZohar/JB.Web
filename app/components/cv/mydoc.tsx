import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { cvActions } from "app/redux/features/cv";
import Moment from "react-moment";
import moment from "moment";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";

export default function Mydoc(props) {
  Font.register({
    family: "NunitoBold",
    src: "/font/Nunito-Bold.ttf",
  });

  Font.register({
    family: "NunitoRegular",
    src: "/font/Nunito-Regular.ttf",
  });

  const styles = StyleSheet.create({
    page: {
      padding: "50 30",
      backgroundColor: "white",
      fontSize: 12,
      fontFamily: "NunitoRegular",
    },
    workView: {
      // flexDirection: "column",
    },
    avatar: {
      width: "auto",
      height: 150,
    },
    infos: {
      marginVertical: 2,
      flexDirection: "row",
    },
    icon: {
      width: 15,
      height: 15,
      marginRight: 10,
    },
    introArea: {
      flexDirection: "row",
    },
    granduated: {
      fontFamily: "NunitoBold",
      color: props.color,
      marginRight: 5,
    },

    studying: {
      fontFamily: "NunitoBold",
      color: "#f8d768",
      marginRight: 5,
    },

    contactArea: {
      marginLeft: 20,
      // flexDirection: "column",
      justifyContent: "center",
    },
    Name: {
      fontSize: 26,
      marginBottom: 2,
      width: "65%",
      fontFamily: "NunitoBold",
      color: props.color,
    },
    Description: {
      fontFamily: "NunitoBold",
      color: "#1e88e5",
    },
    contact: {
      width: "65%",
      justifyContent: "space-between",
    },
    introduction: {
      marginVertical: 15,
    },
    destext: {
      display: "flex",
      width: 130,
      alignItems: "flex-end",
      marginRight: 10,
    },
    workElement: {
      width: "70%",
      display: "flex",
      flexDirection: "row",
      marginBottom: 15,
    },
    exArea: {
      // flexDirection: "column",
    },
    exElement: {
      marginBottom: 5,
    },
    skillElement: {
      marginRight: 15,
    },
    boxblue: {
      height: 12,
      width: 12,
      backgroundColor: "#1e88e5",
    },
    boxgray: {
      height: 12,
      width: 12,
      backgroundColor: "gray",
    },
  });
  return (
    <Document>
      <Page size="A4" style={styles.page} orientation="portrait" wrap>
        <View style={styles.introArea}>
          {props.avatar != "" && (
            <Image style={styles.avatar} src={props.cvInfo.avatar}></Image>
          )}
          <View style={styles.contactArea}>
            <Text style={styles.Name}>{props.cvInfo.name}</Text>
            <View style={styles.contact}>
              {props.cvInfo.email != "" && props.cvInfo.email != null && (
                <View style={styles.infos}>
                  <Image style={styles.icon} src="/email.png"></Image>
                  <Text>{props.cvInfo.email}</Text>
                </View>
              )}
              {props.cvInfo.phonenumber != "" &&
                props.cvInfo.phonenumber != null && (
                  <View style={styles.infos}>
                    <Image style={styles.icon} src="/call.png"></Image>
                    <Text>{props.cvInfo.phonenumber}</Text>
                  </View>
                )}
              {props.cvInfo.address != "" && props.cvInfo.address != null && (
                <View style={styles.infos}>
                  <Image style={styles.icon} src="/home.png"></Image>
                  <Text>{props.cvInfo.address}</Text>
                </View>
              )}
              {props.cvInfo.website != "" && props.cvInfo.website != null && (
                <View style={styles.infos}>
                  <Image style={styles.icon} src="/global.png"></Image>
                  <Text>{props.cvInfo.website}</Text>
                </View>
              )}
              {props.cvInfo.github != "" && props.cvInfo.github != null && (
                <View style={styles.infos}>
                  <Image style={styles.icon} src="/github.png"></Image>
                  <Text>{props.cvInfo.github}</Text>
                </View>
              )}
              {props.cvInfo.reference != null && props.cvInfo.reference != "" && (
                <View style={styles.infos}>
                  <Image style={styles.icon} src="/reference.jpg"></Image>
                  <Text>{props.cvInfo.reference}</Text>
                </View>
              )}
              {props.cvInfo.birthDate != "" && props.cvInfo.birthDate != null && (
                <View style={styles.infos}>
                  <Image style={styles.icon} src="/calendar.png"></Image>
                  <Text>
                    {moment(props.cvInfo.birthDate).format("DD/MM/YYYY")}
                  </Text>
                </View>
              )}
              {props.cvInfo.gender != "" && props.cvInfo.gender != null && (
                <View style={styles.infos}>
                  <Image style={styles.icon} src="/gender.png"></Image>
                  <Text>{props.cvInfo.gender}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
        <View style={styles.introduction}>
          <Text>{props.cvInfo.introduction}</Text>
        </View>
        <View style={styles.workView}>
          {props.cvInfo.experience.length != 0 && (
            <View style={styles.workElement} wrap>
              <View style={styles.destext}>
                <Text style={styles.Description}>WORKS EXPERIENCES</Text>
              </View>
              <View style={styles.exArea}>
                {props.cvInfo.experience.map((data) => (
                  <View style={styles.exElement}>
                    <Text style={styles.Description}>{data.company}</Text>
                    <Text>{data.position}</Text>
                    <Text>{data.duration} </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
          {props.cvInfo.education.length != 0 && (
            <View style={styles.workElement} wrap>
              <View style={styles.destext}>
                <Text style={styles.Description}>EDUCATION</Text>
              </View>
              <View style={styles.exArea}>
                {props.cvInfo.education.map((data) => (
                  <View style={styles.exElement}>
                    {data.status == "Graduated" ? (
                      <View style={styles.introArea}>
                        <Text style={styles.granduated}>{data.school}</Text>
                        <Image
                          style={styles.icon}
                          src="/graduation.png"
                        ></Image>
                      </View>
                    ) : (
                      <View style={styles.introArea}>
                        <Text style={styles.studying}>{data.school}</Text>
                        <Image
                          style={styles.icon}
                          src="/reading-book.png"
                        ></Image>
                      </View>
                    )}
                    <Text>{data.major}</Text>
                    <Text>{data.profession}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {props.cvInfo.skill.length != 0 && (
            <View style={styles.workElement} wrap>
              <View style={styles.destext}>
                <Text style={styles.Description}>SKILLS</Text>
              </View>
              <View wrap>
                {props.cvInfo.skill.map((data) => (
                  <View style={styles.skillElement}>
                    <Text>{data.skillName}</Text>
                    <View style={styles.introArea}>
                      {[...Array(parseInt(data.level))].map(() => (
                        <View style={styles.boxblue}></View>
                      ))}
                      {[...Array(5 - parseInt(data.level))].map(() => (
                        <View style={styles.boxgray}></View>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}
          {props.cvInfo.activity.length != 0 && (
            <View style={styles.workElement} wrap>
              <View style={styles.destext}>
                <Text style={styles.Description}>ACTIVITIES</Text>
              </View>
              <View style={styles.exArea}>
                {props.cvInfo.activity.map((data) => (
                  <View style={styles.exElement}>
                    <Text>{data}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
          {props.cvInfo.certification.length != 0 && (
            <View style={styles.workElement} wrap>
              <View style={styles.destext}>
                <Text style={styles.Description}>CERTIFICATIONS</Text>
              </View>
              <View style={styles.exArea}>
                {props.cvInfo.certification.map((data) => (
                  <View style={styles.exElement}>
                    <Text>{data}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
          {props.cvInfo.award.length != 0 && (
            <View style={styles.workElement} wrap>
              <View style={styles.destext}>
                <Text style={styles.Description}>AWARDS</Text>
              </View>
              <View style={styles.exArea}>
                {props.cvInfo.award.map((data) => (
                  <View style={styles.exElement}>
                    <Text>{data}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}
