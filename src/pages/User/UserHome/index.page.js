import React, { useEffect, useState } from "react";
import {
  Flex,
  Button,
  Switch,
  Select,
  Typography,
  Row,
  Col,
  Card,
  Spin
} from "antd";
import {
  BarChartOutlined,
  ExportOutlined,
  FileDoneOutlined,
  FileSearchOutlined,
  LinkOutlined
} from "@ant-design/icons";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import logger from "helpers/logger";
import { commonService } from "services/common.service";
import { ENDPOINT_LISTS } from "apiEndPoints";
import { receptFilterOptions } from "utils/static";
import { baseRoutes } from "helpers/baseRoutes";

function UserHome() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, setState] = useState({
    isLoading: false,
    documentLists: {},
    recentFilter: receptFilterOptions[0].value
  });
  const [mainHeight, setMainHeight] = useState(0);

  const { Text, Title } = Typography;

  const handleStateChange = (key, value) => {
    setState((prevState) => ({
      ...prevState,
      ...(typeof key === "string" ? { [key]: value } : key)
    }));
  };

  const getDocumentLists = async () => {
    handleStateChange("isLoading", true);
    try {
      const queryParams = {};

      const sortValue = searchParams.get("sort");
      const searchValue = searchParams.get("search");
      const isSorted =
        sortValue &&
        receptFilterOptions.some((option) => option.value === sortValue);

      queryParams.sort = isSorted ? sortValue : receptFilterOptions[0].value;
      queryParams.q = " ";

      if (searchValue) {
        queryParams.q = searchValue;
      }

      const currentDocument = searchParams.get("document") || "literature";
      const response = await commonService({
        apiEndPoint: ENDPOINT_LISTS.getDocumentByTag(currentDocument),
        queryParams
      });

      handleStateChange({
        isLoading: false,
        documentLists: Array.isArray(response?.data?.data)
          ? response?.data?.data
          : response?.data?.data.hits?.hits
      });
    } catch (error) {
      handleStateChange("isLoading", false);
      logger(error);
    }
  };

  const handleChangeRecentFilter = (value) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort", value);
    setSearchParams(newParams);
    handleStateChange("recentFilter", value);
  };

  useEffect(() => {
    getDocumentLists();
  }, [location.search]);

  useEffect(() => {
    const calculateHeight = () => {
      const headerHeight = document.querySelector("header").offsetHeight;
      const footerHeight = document.querySelector("footer").offsetHeight;
      const totalHeight = window.innerHeight - (headerHeight + footerHeight);
      setMainHeight(totalHeight);
    };

    calculateHeight();

    window.addEventListener("resize", calculateHeight);

    return () => window.removeEventListener("resize", calculateHeight);
  }, []);

  return (
    <>
      <main className="homePage bg-60" style={{ minHeight: `${mainHeight}px` }}>
        <section className="listSec">
          <div className="listSec_inner">
            <Row justify="center">
              <Col xxl={18} xl={20} lg={22} xs={24}>
                <Row justify="center" gutter={32}>
                  <Col lg={17} xs={24}>
                    <div className="listBox">
                      <Flex
                        align="center"
                        className="listBox_head"
                        justify="space-between"
                      >
                        <Flex align="center" className="listBox_head_lft">
                          <div className="listBox_head_lft_items">
                            <div className="listBox_head_result">
                              1,648,684 results
                            </div>
                          </div>
                          <div className="listBox_head_lft_items">
                            <Button
                              type="link"
                              disabled
                              className="p-0 listBox_head_btn"
                            >
                              <ExportOutlined /> cite all
                            </Button>
                          </div>
                        </Flex>
                        <Flex align="center" className="listBox_head_rht">
                          <div className="listBox_head_rht_summary">
                            <Text
                              className="listBox_head_rht_summary_txt"
                              type="secondary"
                            >
                              Citation Summary
                            </Text>
                            <Switch
                              checkedChildren={<BarChartOutlined />}
                              unCheckedChildren={<BarChartOutlined />}
                            />
                          </div>
                          <div className="listBox_head_rht_select">
                            <Select
                              defaultValue={state.recentFilter}
                              value={state.recentFilter}
                              options={receptFilterOptions}
                              onSelect={handleChangeRecentFilter}
                            />
                          </div>
                        </Flex>
                      </Flex>
                      <div className="listBox_body">
                        {state.isLoading ? (
                          <Flex justify="center">
                            <Spin />
                          </Flex>
                        ) : !state.isLoading &&
                          Object.keys(state.documentLists).length > 0 &&
                          state.documentLists?.length > 0 ? (
                          <>
                            {state.documentLists?.map((hitItem, index) => (
                              <Card bordered>
                                <Flex justify="space-between">
                                  <Title
                                    level={2}
                                    className="listBox_body_title"
                                  >
                                    <Link
                                      to={`${baseRoutes.userBaseRoutes}literature/${hitItem?._id}`}
                                    >
                                      {hitItem?._source?.metadata?.titles?.[0]
                                        ?.title ?? "-"}
                                    </Link>
                                  </Title>
                                  <Text
                                    className="listBox_body_numtxt"
                                    type="secondary"
                                  >
                                    #{index + 1}
                                  </Text>
                                </Flex>
                                {hitItem?._source?.metadata?.authors?.length >
                                  0 && (
                                  <Flex
                                    wrap="wrap"
                                    align="center"
                                    className="listBox_body_links"
                                  >
                                    {hitItem?._source?.metadata?.authors?.map(
                                      (authorItem, authorItemIdx) => (
                                        <div
                                          className="listBox_body_links_items"
                                          key={authorItemIdx}
                                        >
                                          <Link
                                            to="#"
                                            onClick={(e) => e.preventDefault()}
                                          >
                                            <Text>
                                              {authorItem?.first_name ?? "-"}
                                              &nbsp;
                                              {authorItem?.last_name ?? "-"}
                                            </Text>
                                            {authorItemIdx <
                                              hitItem?._source?.metadata
                                                ?.authors?.length -
                                                1 && ", "}
                                          </Link>
                                        </div>
                                      )
                                    )}
                                  </Flex>
                                )}

                                <div className="listBox_body_publish">
                                  <Text>
                                    Published in:&nbsp;
                                    {
                                      hitItem?._source?.metadata
                                        ?.publication_info?.[0]?.journal_title
                                    }
                                    &nbsp;
                                    {
                                      hitItem?._source?.metadata
                                        ?.publication_info?.[0]?.journal_volume
                                    }
                                    &nbsp;(
                                    {
                                      hitItem?._source?.metadata
                                        ?.publication_info?.[0]?.year
                                    }
                                    )
                                  </Text>
                                </div>
                                <div className="listBox_body_btns">
                                  <Flex justify="space-between" align="center">
                                    <div className="listBox_body_btns_lft">
                                      <Link to="#">
                                        <LinkOutlined />
                                        <Text>DOI</Text>
                                      </Link>
                                      <Link to="#">
                                        <ExportOutlined />
                                        <Text>cite</Text>
                                      </Link>
                                      <Link to="#" className="disabled">
                                        <FileDoneOutlined />
                                        <Text>claim</Text>
                                      </Link>
                                    </div>
                                    <div className="listBox_body_btns_rht">
                                      <Link to="#">
                                        <FileSearchOutlined />
                                        <Text>reference search</Text>
                                      </Link>
                                      <Link to="#">
                                        <ExportOutlined />
                                        <Text>0 citations</Text>
                                      </Link>
                                    </div>
                                  </Flex>
                                </div>
                              </Card>
                            ))}
                          </>
                        ) : (
                          <>No Data Found</>
                        )}
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </section>
      </main>
    </>
  );
}

export default UserHome;
