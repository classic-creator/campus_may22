import React, { useEffect, Fragment } from 'react'
import { getSelectedApplication } from '../../../action/applyAction'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Sidebar from '../sidebar'

import { Link } from 'react-router-dom'

import { Button, Table, Space, Form, Input } from 'antd'

const SelectedApplicationList = () => {

  const { SelectedApplication, loading } = useSelector(state => state.selectedApplication)
  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {


    dispatch(getSelectedApplication(id))

  }, [dispatch, id])


  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      width: 50,
      fixed: 'left'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      align: "center",
      editable: true,
      render: (_, record) => (
        <Link to={`/course/deashboard/${record.id}`}>{record.name}</Link>
      ),
    },
    {
      title: 'Parcentage'
      , dataIndex: 'mark_obtain_lastExam',
      align: "center",
      editable: true
    },
    {
      title: 'Application Status',
      dataIndex: "admission_status",
      align: "center",
      editable: true,
      render(text, record) {
          return {
            props: {
              style: { color: record.admission_status==='Selected'? "green" : "red" }
            },
            children: <div>{text}</div>
          };
        }
     
  },
  {
      title: 'Payment Status',
      dataIndex: "payment_status",
      align: "center",
      editable: true,
      render(text, record) {
          return {
            props: {
              style: { color: record.payment_status==='Selected'? "green" : "red" }
            },
            children: <div>{text}</div>
          };
        }
     
  },
    {
      title: 'Action',
      dataIndex: "action",
      align: "center"
      , render: (_, record) =>
        rows.length >= 1 ? (
          <Space>
            <Link to={`/apply/update/${record.id}`}> <Button type='primary'> Open</Button></Link>
          </Space>
        ) : null
    }
  ]

  const rows = []


  SelectedApplication && SelectedApplication.forEach((item) => {
    rows.push({
      id: item.id,
      name: item.first_name + ' '+item.middle_name+' ' + item.last_name,
      admission_status: item.admission_status,
      payment_status:item.payment_status,
      district: item.district,
      mark_obtain_lastExam: item.mark_obtain_lastExam


    })
  })

  return (
    <Fragment>
      <div className='dashboard'>
        <Sidebar />
        {/* //courseTable */}
        <div className="container">

          <h2>Selected students</h2>
          <div className=" allCourseTable" style={{ overflowX: 'auto' }}>

            <Table
              columns={columns}
              dataSource={rows}
              bordered
              loading={loading}
              scroll={{
                x: 1000,
                y: 400,
              }}

            />

          </div>
        </div>

      </div>

    </Fragment>
  )
}

export default SelectedApplicationList