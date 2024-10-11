import {
  ExportOutlined,
  FileDoneOutlined,
  FileSearchOutlined,
  LoginOutlined
} from "@ant-design/icons";
import { Col, Flex, List, Row, Typography, Empty, Tag, Tabs, Spin } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { ENDPOINT_LISTS } from "apiEndPoints";
import logger from "helpers/logger";
import React, { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams
} from "react-router-dom";
import { commonService } from "services/common.service";

const { Title, Text } = Typography;

function Literature() {
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [state, setState] = useState({
    isLoading: false,
    documentDetails: {}
  });

  const handleStateChange = (key, value) => {
    setState((prevState) => ({
      ...prevState,
      ...(typeof key === "string" ? { [key]: value } : key)
    }));
  };

  const getDocumentDetailsById = async () => {
    handleStateChange("isLoading", true);
    try {
      const currentDocument = searchParams.get("document") || "literature";
      const response = await commonService({
        apiEndPoint: ENDPOINT_LISTS.getDocumentById(currentDocument, params.id)
      });

      handleStateChange({
        isLoading: false,
        documentDetails: response?.data
      });
    } catch (error) {
      handleStateChange("isLoading", false);
      logger(error);
    }
  };

  useEffect(() => {
    if (!params.id) {
      navigate("/?document=literature");
    } else {
      getDocumentDetailsById();
    }
  }, []);

  return (
    <>
      {state.isLoading ? (
        <Spin />
      ) : !state.isLoading && Object.keys(state.documentDetails).length ? (
        <main className="literaturePage bg-60">
          {/* leterature section start */}
          <section>
            <div className="container">
              <Row justify="space-between">
                {/* Top left Card */}
                <Col xl={16} xs={24}>
                  <div className="card">
                    <Title level={2} className="card_title">
                      {state.documentDetails?._source?.metadata?.titles?.[0]
                        ?.title ?? "-"}
                    </Title>
                    {state.documentDetails?._source?.metadata?.authors?.length >
                      0 && (
                      <List className="literaturePage_list">
                        {state.documentDetails?._source?.metadata?.authors?.map(
                          (authorItem, authorItemIdx) => (
                            <List.Item className="p-0" key={authorItemIdx}>
                              <Link to="#" onClick={(e) => e.preventDefault()}>
                                {authorItem?.first_name ?? "-"}
                                &nbsp;
                                {authorItem?.last_name ?? "-"}
                                {authorItemIdx <
                                  state.documentDetails?._source?.metadata
                                    ?.authors?.length -
                                    1 && ", "}
                              </Link>
                            </List.Item>
                          )
                        )}
                      </List>
                    )}

                    <Typography.Text>
                      {state.documentDetails?._source?.metadata?.date
                        ? state.documentDetails?._source?.metadata?.date
                        : state.documentDetails?._source?.metadata
                            ?.earliest_date}
                    </Typography.Text>
                    <div className="literaturePage_inner">
                      <Text>
                        Published in:&nbsp;
                        {
                          state.documentDetails?._source?.metadata
                            ?.publication_info?.[0]?.journal_title
                        }
                        &nbsp;
                        {
                          state.documentDetails?._source?.metadata
                            ?.publication_info?.[0]?.journal_volume
                        }
                        &nbsp;(
                        {
                          state.documentDetails?._source?.metadata
                            ?.publication_info?.[0]?.year
                        }
                        )
                      </Text>
                      <Text>
                        Published:&nbsp;
                        <span>
                          {state.documentDetails?._source?.metadata?.date
                            ? state.documentDetails?._source?.metadata?.date
                            : state.documentDetails?._source?.metadata
                                ?.earliest_date}
                        </span>
                      </Text>
                    </div>
                    <div className="literaturePage_btns">
                      <Flex justify="space-between" align="center">
                        <div className="literaturePage_btns_lft">
                          <Link to="#">
                            <ExportOutlined />
                            <Text>cite</Text>
                          </Link>
                          <Link to="#" className="disabled">
                            <FileDoneOutlined />
                            <Text>claim</Text>
                          </Link>
                        </div>
                        <div className="literaturePage_btns_rht">
                          <Link to="#">
                            <FileSearchOutlined />
                            <Text>reference search</Text>
                          </Link>
                          <Link to="#">
                            <LoginOutlined />
                            <Text>0 citations</Text>
                          </Link>
                        </div>
                      </Flex>
                    </div>
                  </div>
                </Col>
                {/* Top Right Card */}
                <Col xl={8} xs={24}>
                  <div className="card card_content">
                    <div>
                      <Title level={3} className="card_subTitle">
                        Citations per year
                      </Title>
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description={
                          <Typography.Text>0 Citations</Typography.Text>
                        }
                      />
                    </div>
                  </div>
                </Col>
                {/* Tags Card */}
                <Col xs={24}>
                  <div className="card">
                    <Typography.Text>
                      Abstract:&nbsp;
                      {state.documentDetails?._source?.metadata?.abstracts
                        ?.length > 0
                        ? `(${state.documentDetails?._source?.metadata?.abstracts?.[0]?.source})`
                        : "-"}
                      &nbsp;
                    </Typography.Text>
                    <Typography.Text>
                      {state.documentDetails?._source?.metadata?.abstracts
                        ?.length > 0
                        ? state.documentDetails?._source?.metadata
                            ?.abstracts?.[0]?.value
                        : "-"}
                    </Typography.Text>
                    {state.documentDetails?._source?.metadata?.keywords
                      ?.length > 0 && (
                      <List className="card_tag">
                        {state.documentDetails?._source?.metadata?.keywords?.map(
                          (keywordItem, keywordItemIdx) => (
                            <List.Item key={keywordItemIdx}>
                              <Tag color="processing">{keywordItem.value}</Tag>
                            </List.Item>
                          )
                        )}
                      </List>
                    )}
                  </div>
                </Col>
                {/* List Card */}
                <Col xs={24}>
                  <Tabs defaultActiveKey="1" type="card">
                    <TabPane tab="References" key="1"></TabPane>
                    <TabPane tab="Figures (0)" key="2"></TabPane>
                  </Tabs>
                </Col>
              </Row>
            </div>
          </section>
          {/* leterature section end */}
        </main>
      ) : (
        <div>No data found</div>
      )}
    </>
  );
}

export default Literature;
