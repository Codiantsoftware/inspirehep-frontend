import React, { useEffect, useRef, useState } from "react";
import { Layout, Dropdown, Input, Row, Col, Space, Select } from "antd";
import { Link, useSearchParams } from "react-router-dom";
import { documentOptions } from "utils/static";

// dropdown options
const { Header } = Layout;
const { Search } = Input;

const items = [
  {
    key: "1",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="#!">
        1st menu item
      </a>
    )
  },
  {
    key: "2",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="#!">
        2nd menu item
      </a>
    )
  },
  {
    key: "3",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="#!">
        3rd menu item
      </a>
    )
  }
];

const AppHeader = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [state, setState] = useState({
    active: "literature",
    select: "literature",
    search: ""
  });

  const [isSticky, setIsSticky] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null);

  const handleStateChange = (key, value) => {
    setState((prevState) => ({
      ...prevState,
      ...(typeof key === "string" ? { [key]: value } : key)
    }));
  };
  const handleSelectChange = (e) => {
    handleStateChange("select", e);
  };

  const handleChangeDocument = (document) => {
    handleStateChange("active", document);
    setSearchParams({ document });
  };

  const handleSearch = (value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set("search", state.search);
      setSearchParams(newParams);
    } else {
      newParams.delete("search");
      setSearchParams(newParams);
    }
  };

  // Scroll event handler to toggle sticky class
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setIsSticky(scrollTop > 50); // adjust scroll threshold as needed
  };

  // Recalculate header height and adjust top padding
  const updateHeaderHeight = () => {
    const header = headerRef.current;
    if (header) {
      const height = header.offsetHeight;
      setHeaderHeight(height);
      document.body.style.paddingTop = `${height}px`;
    }
  };

  useEffect(() => {
    const currentUrlTab = searchParams.get("document");
    let active = currentUrlTab ? currentUrlTab : state.active;
    const isActive = documentOptions.find(
      (item) => active === item.value && !item?.disabled
    );
    if (!isActive) {
      active = state.active;
    }
    handleStateChange("active", active);
    setSearchParams({ document: active });
  }, []);

  useEffect(() => {
    updateHeaderHeight();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateHeaderHeight);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, []);

  return (
    <Header className={`header ${isSticky ? "sticky" : ""}`} ref={headerRef}>
      <Row align="middle" justify="space-between">
        {/* Logo */}
        <Col xl={5} md={24} sm={24} xs={24}>
          <div className="logo">
            {/* <ImageElement source="header-logo.svg" width={154} height={32} className="img-fluid" alt="header-logo"/> */}
          </div>
        </Col>
        <Col xl={14} md={24} sm={24} xs={24}>
          <Row
            className="header_searchBar"
            align="middle"
            justify="space-between"
          >
            <Space.Compact>
              <Select
                defaultValue={state.select}
                value={state.select}
                onChange={handleSelectChange}
                options={documentOptions}
              />
              <Search
                placeholder=""
                allowClear
                value={state.search}
                onChange={(e) => handleStateChange("search", e.target.value)}
                onSearch={handleSearch}
              />
            </Space.Compact>
          </Row>
        </Col>
        <Col xl={5} md={24} sm={24} xs={24}>
          <Row className="header_menu_right" justify="end">
            <Space className="header_menu" direction="vertical">
              <Space wrap>
                <Dropdown menu={{ items }} placement="bottomLeft">
                  <span className="header_menu_dropdown">Help</span>
                </Dropdown>
                <Dropdown menu={{ items }} placement="bottomLeft">
                  <span className="header_menu_dropdown">Submit</span>
                </Dropdown>
                <Link to="/login">Login</Link>
              </Space>
            </Space>
          </Row>
        </Col>
      </Row>
      <Row align="middle" justify="center" className="header_bottm_menu">
        {documentOptions.map((item) => (
          <Col>
            <Link
              to="#"
              onClick={(e) => {
                e.preventDefault();
                if (!item.disabled) {
                  handleChangeDocument(item.value);
                }
              }}
              className={`${state.active === item.value ? "active" : ""}`}
            >
              {item.label}
            </Link>
          </Col>
        ))}

        <Col>
          <Dropdown menu={{ items }} placement="bottomLeft">
            <span className="header_menu_dropdown">More...</span>
          </Dropdown>
        </Col>
      </Row>
    </Header>
  );
};

export default AppHeader;
