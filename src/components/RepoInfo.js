import React from "react";

function RepoInfo({ repo }) {
  let license;

  switch (repo.licenseInfo?.spdxId) {
    case undefined:
      license = (
        <span className="px-1 py-0 ms-1 d-inline-block btn btn-sm btn-danger" style={{fontSize:".6rem"}}>
          NO LICENSE
        </span>
      )
      break;
    case "NOASSWRTION":
      license = (
        <span className="px-1 py-0 ms-1 d-inline-block btn btn-sm btn-warning" style={{fontSize:".6rem"}}>
          {repo.licenseInfo.spdxId}
        </span>
      )
      break;
    default:
      license = (
        <span className="px-1 py-0 ms-1 d-inline-block btn btn-sm btn-outline-success" style={{fontSize:".6rem"}}>
          {repo.licenseInfo.spdxId}
        </span>
      )
      break;
  }

  return (
    <li className="list-group-item" key={repo.id}>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex flex-column">
          <a href={repo.url} className="h5 mb-0 text-decoration-none">
            {repo.name}
          </a>
          <p className="small">{repo.description}</p>
        </div>
        <div className="text-nowrap ms-3">
          {license}
          <span
            className={
              "px-1 py-0 ms-1 d-inline-block btn btn-sm " +
              (repo.viewerSubscription === "SUBSCRIBED"
                ? "btn-success"
                : "btn-outline-secondary")
            }
            style={{ fontSize: ".6rem" }}
          >
            {repo.viewerSubscription}
          </span>
        </div>
      </div>
    </li>
  );
}

export default RepoInfo;
