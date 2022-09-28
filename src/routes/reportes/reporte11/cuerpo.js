import { SearchOutlined } from '@ant-design/icons';
import { DatePicker, Row, Col, Select, Tooltip, Button } from 'antd';
import { useState } from 'react';
import { tablasPrincipales } from '../../../constants/TablasPrincipales';
import { httpClientBuenaventuraReports } from '../../../util/Api';
import Tablas from './tablas';

const Cuerpo = () => {
  const [ano, setAno] = useState('');
  const [meses, setMeses] = useState([]);
  const [especialidades, setEspecialidades] = useState({});
  const [data, setData] = useState(null);
  const [cargando, setCargando] = useState(false);

  const onChangeAno = (date, dateString) => {
    setAno(dateString);
  };

  const { Option } = Select;

  const mesesData = tablasPrincipales.TablasPrincipales[1].map((item) => (
    <Option key={item.prefijo}>{item.desc_mes}</Option>
  ));

  const especialidadData = tablasPrincipales.TablasPrincipales[0].map(
    (item) => <Option key={item.cod_esp}>{item.desc_esp}</Option>
  );

  function handleChangeMeses(value) {
    const dat = value.map((element) => {
      const seleccionado = tablasPrincipales.TablasPrincipales[1].filter(
        (item) => item.prefijo === element
      );

      const resp = {
        orden: seleccionado[0].cod_mes,
        key: seleccionado[0].prefijo,
        value: seleccionado[0].desc_mes
      };
      return resp;
    });

    setMeses(dat);
  }

  function handleChangeEspecialidades(value) {
    const dat = value.map((element) => {
      const seleccionado = tablasPrincipales.TablasPrincipales[0].filter(
        (item) => item.cod_esp === element
      );

      const resp = {
        key: seleccionado[0].cod_esp,
        titulo: seleccionado[0].desc_esp
      };
      return resp;
    });

    setEspecialidades(dat);
  }

  async function traerData() {

    if (ano !== '' && meses && especialidades) {
      setCargando(true);

      const dates = meses.map(mes => {
        return `${mes.orden}/${ano}`;
      });

      const specialities = especialidades.map(res => {
        return res.titulo;
      })

      console.log('Dates: ', dates);
      console.log('Specialities: ', specialities);

      const response = await httpClientBuenaventuraReports.post('/v1/reportes/reservas', {
        fechas: dates,
        especialidades: specialities
      });
      setData(response.data);
      setCargando(false);
    }
  }

  return (
    <div>
      <Col xs={24}>
        <Row justify='center' align='middle'>
          <Col xs={4}>
            <Tooltip title='Seleccione el año'>
              <DatePicker
                onChange={onChangeAno}
                picker='year'
                placeholder='Año'
              />
            </Tooltip>
          </Col>
          <Col xs={9}>
            <Tooltip title='Seleccione los meses'>
              <Select
                mode='multiple'
                allowClear
                style={{ width: '100%' }}
                placeholder='Seleccione los meses'
                onChange={handleChangeMeses}
              >
                {mesesData}
              </Select>
            </Tooltip>
          </Col>
          <Col xs={9}>
            <Tooltip title='Seleccione la especialidad'>
              <Select
                mode='multiple'
                allowClear
                style={{ width: '100%' }}
                placeholder='Seleccione la especialidad'
                onChange={handleChangeEspecialidades}
              >
                {especialidadData}
              </Select>
            </Tooltip>
          </Col>

          <Col xs={2}>
            <Tooltip title='buscar'>
              <Button
                type='primary'
                shape='circle'
                icon={<SearchOutlined />}
                size='large'
                onClick={() => traerData()}
                loading={cargando}
              />
            </Tooltip>
          </Col>
        </Row>

        {data ? (
          <Tablas data={data}></Tablas>
        ) : <div></div>}
      </Col>
    </div>
  );
};

export default Cuerpo;
