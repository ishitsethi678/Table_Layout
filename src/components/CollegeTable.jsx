import React, { useState, useEffect } from "react";
import "../components/CollegeTable.css";
import starIcon from "../assets/star.png";
import iitIcon from "../assets/iit-icon.png";
import indiatoday from "../assets/indiatoday.png";

function CollegeTable() {
  const [colleges, setColleges] = useState([]);
  const [visible, setVisible] = useState(10);
  const [sortOption, setSortOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    import("../colleges.json").then((data) => {
      setColleges(data.default);
    });
  }, []);

  const loadMore = () => {
    setVisible((prevValue) => prevValue + 10);
  };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sortedColleges = () => {
    let sorted = [...colleges];
    sorted.sort((a, b) => {
      const [criteria, order] = sortOption.split("_");
      if (criteria === "cdRank" || criteria === "courseFees") {
        return order === "asc"
          ? parseInt(a[criteria].replace(/,/g, "")) -
              parseInt(b[criteria].replace(/,/g, ""))
          : parseInt(b[criteria].replace(/,/g, "")) -
              parseInt(a[criteria].replace(/,/g, ""));
      } else if (criteria === "userReviews") {
        return order === "asc"
          ? parseFloat(a[criteria]) - parseFloat(b[criteria])
          : parseFloat(b[criteria]) - parseFloat(a[criteria]);
      } else if (criteria === "name") {
        return order === "asc"
          ? a[criteria].localeCompare(b[criteria])
          : b[criteria].localeCompare(a[criteria]);
      }
      return 0;
    });
    return sorted;
  };

  const handleSort = (value) => {
    setSortOption(value);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const renderStars = (rating) => {
    return (
      <img
        src={starIcon}
        alt="star"
        className="star-icon"
        style={{ width: "15px", height: "15px" }}
      />
    );
  };

  return (
    <div className="container">
      <div className="middle-container">
        <div>
          <input
            type="text"
            className="search"
            placeholder="Search by college name"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div>
          <select
            className="dropdown"
            value={sortOption}
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="cdRank_asc">CD Rank (Ascending)</option>
            <option value="cdRank_desc">CD Rank (Descending)</option>
            <option value="name_asc">College Name</option>
            <option value="courseFees_asc">Course Fees (Ascending)</option>
            <option value="courseFees_desc">Course Fees (Descending)</option>
            <option value="userReviews_asc">User Reviews (Ascending)</option>
            <option value="userReviews_desc">User Reviews (Descending)</option>
          </select>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>CD Rank</th>
            <th>College Name</th>
            <th>Course Fees</th>
            <th>Placement</th>
            <th>User Reviews</th>
            <th>Ranking</th>
          </tr>
        </thead>
        <tbody>
          {sortedColleges()
            .filter((college) =>
              college.name.toLowerCase().includes(searchTerm)
            )
            .slice(0, visible)
            .map((college) => (
              <tr
                key={college.id}
                className={college.featured ? "featured" : ""}
              >
                <td>{college.cdRank}</td>
                <td style={{ fontWeight: "bold", color: "#76c7bd" }}>
                  <img
                    src={iitIcon}
                    alt="IIT"
                    className="college-icon"
                    style={{
                      width: "20px",
                      height: "20px",
                      marginRight: "5px",
                    }}
                  />
                  {college.name}
                  <br />
                  <span style={{ fontSize: "12px", color: "#999" }}>
                    {college.descriptionName}
                  </span>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      fontSize: "12px",
                      color: "#999",
                      marginTop: "1%",
                      backgroundColor: "yellow",
                      height: "3.5vh",
                      width: "28vh",
                    }}
                  >
                    <span style={{ color: "Orange" }}>
                      Admission: {college.collegeAdmission}
                    </span>
                    <span>Cut Off: {college.cutOff}</span>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "30vh",
                      }}
                    >
                      <h4 style={{ color: "orange" }}>Apply Now</h4>
                      <h4 style={{ color: "#76c7bd" }}>Download Brochure</h4>
                      <h4 style={{ color: "black" }}>Add To Compare</h4>
                    </div>
                  </div>
                </td>
                <td
                  style={{
                    width: "25vh",
                    color: "#76c7bd",
                    fontWeight: "bold",
                  }}
                >
                  {college.highestPackage}
                  <div
                    style={{
                      marginTop: "7%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <span style={{ color: "grey" }}>{college.courseName}</span>
                    <span style={{ color: "grey", marginTop: "7%" }}>
                      {college.semFees}
                    </span>
                    <span style={{ color: "orange", marginTop: "7%" }}>
                      Compare Fees
                    </span>
                  </div>
                </td>
                <td
                  style={{
                    width: "25vh",
                    color: "#76c7bd",
                    fontWeight: "bold",
                    width: "28vh",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {college.highestPackage}
                    <span style={{color:"grey"}}>Highest Package</span>
                  </div>

                  <div
                    style={{
                      marginTop: "7%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {college.lowestPackage}
                      <span style={{color:"grey"}}>Lowest Package</span>
                    </div>{" "}
                    <span style={{ color: "orange", marginTop: "7%" }}>
                      Compare Placement
                    </span>
                  </div>
                </td>{" "}
                <td>
                  {renderStars(college.userReviews)}
                  {college.userReviews}
                  <div style={{marginTop:"4%",color:"grey",display:"flex",flexDirection:"column"}}>
                    {college.basedReviews}
                    <span style={{marginTop:"3%",color:"orange",fontWeight:"bold"}}>Best In Social Life</span>
                  </div>
                </td>
                <td>{college.ranking}
                <div>
                    <img
                    src={indiatoday}
                    alt="indiatoday"
                    style={{
                      width: "80px",
                      height: "80px",
                    }}
                  />
                </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default CollegeTable;
