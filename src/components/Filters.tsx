import React, { useState, Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useSelector, useDispatch } from "react-redux";

import {
  selectShortTitle,
  selectShortTitleQuery,
  selectStatus,
  selectStatusQuery,
  setShortTitle,
  setShortTitleQuery,
  setStatus,
  setStatusQuery,
} from "../store/programSlice";

import { FiltersProps } from '../interfaces/props'

export default function Filters({ disabled }: FiltersProps) {
  const shortTitleList = [
    "vc",
    "data",
    "data2",
    "data3",
    "scrum",
    "product2",
    "product",
    "growth",
  ];
  const statusList = ["OFFERING", "RUNNING", "OFFBOARDING"];

  const shortTitle = useSelector(selectShortTitle);
  const shortTitleQuery = useSelector(selectShortTitleQuery);
  const status = useSelector(selectStatus);
  const statusQuery = useSelector(selectStatusQuery);
  const dispatch = useDispatch();

  const filteredShortTitle =
    shortTitleQuery === ""
      ? shortTitleList
      : shortTitleList.filter((title) =>
          title.toLowerCase().includes(shortTitleQuery.toLowerCase())
        );
  const filteredStatus =
    statusQuery === ""
      ? statusList
      : statusList.filter((stt) =>
          stt.toLowerCase().includes(statusQuery.toLowerCase())
        );
  return (
    <div className="grid max-w-full grid-cols-1 gap-6 mx-auto mt-8 lg:mt-16 lg:grid-cols-3 lg:max-w-full sm:grid-cols-2">
      <Combobox value={shortTitle} onChange={(e) => dispatch(setShortTitle(e))} multiple disabled={disabled}>
        <div className="relative mt-1">
          <Combobox.Label className="float-left">Short Title</Combobox.Label>
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 focus-visible:outline-none"
              onChange={(event) => dispatch(setShortTitleQuery(event.target.value))}
              displayValue={(titleList: string[]) =>
                titleList.filter((title) => !!title).join(", ")
              }
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => dispatch(setShortTitleQuery(""))}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
              {filteredShortTitle.map((title: string) => (
                <Combobox.Option
                  key={title}
                  value={title}
                  // as={Fragment}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-teal-600 text-white" : "text-gray-900"
                    }`
                  }
                >
                  {({ active, selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {title}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-teal-600"
                          }`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
      <Combobox value={status} onChange={(e) => dispatch(setStatus(e))} multiple disabled={disabled}>
        <div className="relative mt-1">
          <Combobox.Label className="float-left">Status</Combobox.Label>
          <div className="relative w-full cursor-default overflow-hidden rounded-md bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 focus-visible:outline-none"
              onChange={(event) => dispatch(setStatusQuery(event.target.value))}
              displayValue={(sttList: string[]) =>
                sttList.filter((stt) => !!stt).join(", ")
              }
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => dispatch(setStatusQuery(""))}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
              {filteredStatus.map((stt: string) => (
                <Combobox.Option
                  key={stt}
                  value={stt}
                  // as={Fragment}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-teal-600 text-white" : "text-gray-900"
                    }`
                  }
                >
                  {({ active, selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {stt}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-teal-600"
                          }`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
