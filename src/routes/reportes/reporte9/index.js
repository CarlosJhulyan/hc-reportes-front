import { Card } from 'antd';
import React from 'react';
import Cuerpo from './cuerpo';

const Reporte9 = () => {
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
            Reporte agrupado por laboratorios
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

export default Reporte9;
