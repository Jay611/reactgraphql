import github from "./db";
import { useCallback, useEffect, useState } from "react";
import query from "./Query";
import RepoInfo from "./components/RepoInfo";
import SearchBox from "./components/SearchBox";
import NavButton from "./components/NavButtons";

function App() {
  const [userName, setUserName] = useState("");
  const [repoList, setRepoList] = useState(null);
  const [pageCount, setPageCount] = useState(10);
  const [queryString, setQueryString] = useState("");
  const [totalCount, setTotalCount] = useState(null);

  const [startCursor, setStartCursor] = useState(null);
  const [endCursor, setEndCursor] = useState(null);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [paginationKeyword, setPaginationKeyword] = useState("first");
  const [paginationString, setPaginationString] = useState("");

  const fetchData = useCallback(() => {
    const queryText = JSON.stringify(
      query(pageCount, queryString, paginationKeyword, paginationString)
    );
    fetch(github.baseURL, {
      method: "POST",
      headers: github.headers,
      body: queryText,
    })
      .then((response) => response.json())
      .then((data) => {
        setUserName(data.data.viewer.name);
        setRepoList(data.data.search.edges);
        setTotalCount(data.data.search.repositoryCount);

        setStartCursor(data.data.search.pageInfo?.startCursor);
        setEndCursor(data.data.search.pageInfo?.endCursor);
        setHasPreviousPage(data.data.search.pageInfo?.hasPreviousPage);
        setHasNextPage(data.data.search.pageInfo?.hasNextPage);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pageCount, queryString, paginationKeyword, paginationString]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App container mt-5">
      <h1 className="text-primary">
        <i className="bi bi-diagram-2-fill"></i>Repos
      </h1>
      <p>Hey there {userName}</p>
      <SearchBox
        totalCount={totalCount}
        pageCount={pageCount}
        queryString={queryString}
        onTotalChange={(number) => setPageCount(number)}
        onQueryChange={(string) => setQueryString(string)}
      />
      <NavButton
        start={startCursor}
        end={endCursor}
        previous={hasPreviousPage}
        next={hasNextPage}
        onPage={(keyword, string) => {
          setPaginationKeyword(keyword);
          setPaginationString(string);
        }}
      />
      {repoList && (
        <ul className="list-group list-group-flush">
          {repoList.map((repo) => (
            <RepoInfo key={repo.node.id} repo={repo.node} />
          ))}
        </ul>
      )}
      <NavButton
        start={startCursor}
        end={endCursor}
        previous={hasPreviousPage}
        next={hasNextPage}
        onPage={(keyword, string) => {
          setPaginationKeyword(keyword);
          setPaginationString(string);
        }}
      />
    </div>
  );
}

export default App;
