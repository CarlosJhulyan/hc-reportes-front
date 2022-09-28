import React from 'react';
import { Table, Row, Divider, Button } from 'antd';
import { Excel, IStyle } from 'antd-table-saveas-excel';
import { CloudDownloadOutlined } from '@ant-design/icons';


const Titulo = (props) => {
  return (
    <div style={{ width: '100%', marginTop: 10 }}>
      <Divider></Divider>
      <div style={{ paddingTop: 30, paddingBottom: 10 }}>
        <h3
          style={{
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 10,
            fontWeight: 400,
            backgroundColor: '#F9E4B7'
          }}
        >
          {props.titulo.toUpperCase()}
        </h3>
      </div>
    </div>
  );
};

const Tablas = (props) => {
  const { data } = props;

  const columns = data.columns;
  const dataSource = data.dataSource

  return (
    <div>
      <Row>
        <Titulo titulo={'Reporte de otras especialidades'}></Titulo>
      </Row>
      <Row>
        <Button
          type='primary' icon={<CloudDownloadOutlined />}
          style={{
            marginBottom: 20
          }}
          onClick={() => {
            const excel = new Excel();
            const theadCellStyle = {
              background: 'FFFFFF',
              color: '000000',
              fontSize: 9,
              bold: true,
              border: true,
              v: 'center',
              wrapText: true,
              shrinkToFit: true
            };

            const tbodyCellStyle = {
              v: 'bottom',
              wrapText: true,
              fontSize: 9,
              shrinkToFit: true
            };
            excel
              .setTHeadStyle(theadCellStyle)
              .setTBodyStyle(tbodyCellStyle)
              .addSheet('Reservas de especialidades')
              .addColumns(columns)
              .addDataSource(dataSource)
              .saveAs('reporte-reservas-especialidades.xlsx');
          }}
        >
          Descargar Reporte
        </Button>
      </Row>
      <Row>
        <Table bordered
               scroll={{
                 x: 1500
               }}
               pagination={false}
               columns={columns}
               dataSource={dataSource}
        />
      </Row>
    </div>
  );
};

export default Tablas;
