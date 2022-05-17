import React from "react";
import BugItem from "./BugItem";
import Loading from "./Loading";
import EmptyBugItem from "./EmptyBugItem";

const BugItems = ({ isLoading, bugsList }) => {
  return isLoading ? (
    <Loading />
  ) : (
    <section className="mt-3">
      {bugsList.length > 0 ? (
        bugsList.map((bug) => <BugItem key={bug.id} bug={bug} />)
      ) : (
        <EmptyBugItem />
      )}
    </section>
  );
};

export default BugItems;
