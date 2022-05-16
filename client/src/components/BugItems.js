import React from "react";
import BugItem from "./BugItem";
import Loading from "./Loading";

const BugItems = ({ isLoading, bugsList }) => {
  return isLoading ? (
    <Loading />
  ) : (
    <section className="mt-3">
      {bugsList.map((bug) => (
        <BugItem key={bug.id} bug={bug} />
      ))}
    </section>
  );
};

export default BugItems;
