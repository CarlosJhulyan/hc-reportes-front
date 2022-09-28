import React from 'react';
import Cuerpo from './cuerpo';
import { Card } from 'antd';

const Reporte10 = () => {
  return (
    <Card
      title={
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gridTemplateRows: '1fr',
            gridColumnGap: '0px',
            gridRowGap: '0px',
            marginRight: '5%'
          }}
        >
          <div
            style={{
              gridArea: '1 / 1 / 2 / 2',
              fontSize: '22px',
              paddingTop: '20px'
            }}
          >
            Reporte de especialidades
          </div>
          <div
            style={{
              gridArea: '1 / 2 / 2 / 3',
              display: 'flex',
              flexDirection: 'row-reverse',
              paddingTop: '15px'
            }}
          >
          </div>
        </div>
      }
    >
      <Cuerpo />
    </Card>
  );
};

export default Reporte10;
