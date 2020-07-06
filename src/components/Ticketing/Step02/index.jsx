import React from 'react';
import styled, { css } from 'styled-components';

import SectionTitle from '../SectionTitle';

import { seats } from '../../../sampleData/seats.json';

const StepBlock = styled.div`
  width: 1200px;
  background: #000;
  .text-info {
    p {
      color: #fff;
      text-align: center;
      font-size: 11px;
      margin: 15px 0 25px 0;
    }
  }
`;

const PersonSeatCount = styled.div`
  background: #fff;
  width: 100%;
  height: 117px;
  padding: 0 20px;
`;

const ScreenBlock = styled.div`
  width: 1170px;
  height: 488px;
  margin: 0 auto;
  overflow: scroll;

  .screen {
    background: #6e6e6e;
    font-size: 16px;
    font-family: 'Roboto', 'Noto Sans KR';
    font-weight: bold;
    letter-spacing: 15px;
    text-align: center;
    color: #fff;
    padding: 5px 0;
  }
`;

const SeatsBlock = styled.div`
  position: relative;
`;

const Seat = styled.div`
  width: 21px;
  height: 16px;
  font-size: 10px;
  background: #e8e8e8;
  border-radius: 7px 7px 0px 0px;
  font-family: 'Roboto', 'Noto Sans KR';
  ${({ x, y }) => {
    if (x || y) {
      return css`
        position: absolute;
        left: ${x}px;
        top: ${y}px;
      `;
    }
  }}
`;

const SeatsInfoBlock = styled.div`
  height: 41px;
  margin: 35px 0;
  padding-left: 40px;
  background: #333;
`;

const Step02 = () => {
  return (
    <StepBlock>
      <SectionTitle title={'인원/좌석 선택'} />
      <PersonSeatCount />
      <div className="text-info">
        <p>{'- 인원을 선택하세요'}</p>
        {/* <p>{'- 좌석 선택 후 결제하기 버튼을 클릭하세요'}</p> */}
      </div>
      <ScreenBlock>
        <div className="screen">SCREEN</div>
        <SeatsBlock>
          {seats.map((seat) => (
            <Seat
              x={seat.SeatXCoordinate / 5 - 50}
              y={seat.SeatYCoordinate / 5 - 60}
            />
          ))}
          <Seat x={50} y={500} />
        </SeatsBlock>
      </ScreenBlock>
      <SeatsInfoBlock>
        <Seat />
      </SeatsInfoBlock>
    </StepBlock>
  );
};

export default Step02;
