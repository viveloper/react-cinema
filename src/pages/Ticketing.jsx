import React, { useState } from 'react';
import Layout from '../components/Layout';
import AsideStepMenu from '../components/Ticketing/AsideStepMenu';
import Step01 from '../components/Ticketing/Step01';
import SectionCinema from '../components/Ticketing/SectionCinema';
import SectionTitle from '../components/Ticketing/SectionTitle';
import DivisionTabs from '../components/Ticketing/DivisionTabs';
import Divisions from '../components/Ticketing/Divisions';
import SectionMovie from '../components/Ticketing/SectionMovie';
import SectionTime from '../components/Ticketing/SectionTime';
import classes from './Ticketing.module.css';

import ticketingInfo from '../data/ticketingInfo.json';

const Ticketing = () => {
  const [step, setStep] = useState(1);
  const [tab, setTab] = useState('all');
  const [detailDivisionCode, setDetailDivisionCode] = useState('0001');
  const [cinemaId, setCinemaId] = useState('');

  const areaDivisions = ticketingInfo.CinemaDivison.AreaDivisions.Items;
  const specialTypeDivisions =
    ticketingInfo.CinemaDivison.SpecialTypeDivisions.Items;
  const divisions = [...areaDivisions, ...specialTypeDivisions];
  const cinemas = ticketingInfo.Cinemas.Cinemas.Items.filter(
    (cinema) => cinema.DetailDivisionCode === detailDivisionCode
  );

  const handleStepClick = (step) => {
    setStep(step);
  };
  const handleTabClick = (tab) => {
    setTab(tab);
    setDetailDivisionCode(
      tab === 'all'
        ? areaDivisions[0].DetailDivisionCode
        : specialTypeDivisions[0].DetailDivisionCode
    );
  };
  const handleDivisionClick = (code) => {
    setDetailDivisionCode(code);
  };

  const handleCinemaClick = (code) => {
    setCinemaId(code);
  };

  return (
    <Layout theme="light">
      <div className={classes['ticketing-container']}>
        <div className={classes['ticketing-center']}>
          <AsideStepMenu step={step} onClick={handleStepClick} />
          <Step01>
            <SectionCinema
              tab={tab}
              divisions={divisions}
              cinemas={cinemas}
              detailDivisionCode={detailDivisionCode}
              cinemaId={cinemaId}
              onDivisionClick={handleDivisionClick}
              onCinemaClick={handleCinemaClick}
            >
              <SectionTitle title="영화관" />
              <DivisionTabs tab={tab} onClick={handleTabClick} />
              <Divisions
                tab={tab}
                divisions={divisions}
                cinemas={cinemas}
                detailDivisionCode={detailDivisionCode}
                cinemaId={cinemaId}
                onDivisionClick={handleDivisionClick}
                onCinemaClick={handleCinemaClick}
              ></Divisions>
            </SectionCinema>
            <SectionMovie>
              <SectionTitle title="영화 선택" />
            </SectionMovie>
            <SectionTime>
              <SectionTitle title="2020-04-22(오늘)" />
            </SectionTime>
          </Step01>

          {/* <div
            className={`${classes['step-content']} ${classes['step2']}`}
          ></div>
          <div
            className={`${classes['step-content']} ${classes['step3']}`}
          ></div>
          <div
            className={`${classes['step-content']} ${classes['step4']}`}
          ></div> */}
        </div>
      </div>
    </Layout>
  );
};

export default Ticketing;
