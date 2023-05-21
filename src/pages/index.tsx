import type { NextPage } from "next";
import react, { useEffect } from "react";
import Head from "next/head";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";

import styles from "../styles/Home.module.css";

import Filters from "../components/Filters";
import Card from "../components/Card";
import Loading from "../components/Loading";
import Error from "../components/Error";

import { Program } from "../interfaces";
import { useDebounce } from "../hooks";
import {
  getProgramsAsync,
  selectPrograms,
  selectShortTitle,
  selectStatus,
  selectLoading,
  selectError,
} from "../store/programSlice";

const IndexPage: NextPage = () => {
  const programs = useSelector(selectPrograms);
  const shortTitle = useSelector(selectShortTitle);
  const status = useSelector(selectStatus);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  const debouncedShortTitle = useDebounce(shortTitle, 500);
  const debouncedStatus = useDebounce(status, 500);
  useEffect(() => {
    dispatch(
      getProgramsAsync({
        shortTitle: debouncedShortTitle,
        status: debouncedStatus,
      })
    );
  }, [debouncedShortTitle, debouncedStatus]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Entry Level Assessment</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl mb-5">
        <Filters disabled={loading} />
        {error ? (
          <Error error="Failed to load data, please try again" />
        ) : loading ? (
          <div className="w-full flex justify-center mt-5">
            <Loading />
          </div>
        ) : (
          <div className="grid max-w-full grid-cols-1 gap-6 mx-auto mt-8 lg:grid-cols-3 lg:max-w-full sm:grid-cols-2">
            {programs.map((program, index) => {
              const { title, imageUrl, startDate, endDate } = program;
              const note = `${moment(startDate).format("MMM DD")} - ${moment(
                endDate
              ).format("MMM DD")}`;
              return (
                <Card
                  title={title}
                  imageUrl={imageUrl}
                  note={note}
                  key={`programs-${index}`}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default IndexPage;
