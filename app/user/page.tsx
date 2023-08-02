"use client";

import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IUser, fetchUsers, increment } from "@/redux/slice/user-slice";
import { AppDispatch, RootState } from "@/redux/store";
import { useGetUserByIdQuery } from "@/redux/api/user-api";
import { json } from "stream/consumers";

export const ContactDetail = ({ id }: { id: string }) => {
  const { data } = useGetUserByIdQuery(id);
  return <pre>{JSON.stringify(data, undefined, 2)}</pre>;
};

export default function Home() {
  const userRef = useRef(false);

  const { entities, loading, value } = useSelector((state: RootState) => state.user);

  const { data, error, isLoading } = useGetUserByIdQuery("1");

  if (isLoading) {
    console.log("Loading");
  } else {
    data?.map((user: any) => {
      console.log(user.name);
    });
  }

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (userRef.current === false) {
      dispatch(fetchUsers());
    }

    return () => {
      userRef.current = true;
    };
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        data?.map((user: any) => (
          <div key={user.id}>
            {/* <span>
              <ContactDetail id={user.id} />
            </span> */}
            <h3>{user.name}</h3>
          </div>
        ))
      )}

      <button onClick={() => dispatch(increment())}>Click on me</button>
      {value}
    </div>
  );
}
