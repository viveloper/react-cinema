import React from 'react';
import styled, { css } from 'styled-components';

import SectionTitle from '../SectionTitle';
import ViewGradeIcon from '../../ViewGradeIcon';

import { getViewGradeIconOptions } from '../../../util';

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
  display: flex;

  .movie-info {
    display: flex;
    align-items: center;
    img {
      display: block;
      width: 46px;
      border-radius: 4px;
    }
    .text-info {
      margin-left: 8px;

      .title {
        display: flex;
        span {
          font-size: 17px;
          font-weight: bold;
        }
      }
      .detail-info {
        font-size: 11px;
      }
    }
  }
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
  ${({ size }) => {
    if (size === 'small') {
      return css`
        width: 14px;
        height: 10px;
        border-radius: 4px 4px 0px 0px;
      `;
    }
  }}
  ${({ status }) => {
    if (status === 0) {
      return css`
        background: #e8e8e8;
      `;
    } else if (status === 30) {
      return css`
        background: #714034;
        opacity: 0.5;
      `;
    } else if (status === 50) {
      return css`
        background: #444;
      `;
    }
  }}
  ${({ sweetSpot }) =>
    sweetSpot
      ? css`
          border: 1px solid #d41017;
        `
      : ''}
`;

const SeatsInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 41px;
  margin: 35px 0;
  padding-left: 40px;
  /* background: #333; */

  .seat-info-group {
    display: flex;

    .seat-info {
      display: flex;
      align-items: center;
      span {
        font-size: 12px;
        color: #fff;
        margin-left: 4px;
      }
    }
    .seat-info + .seat-info {
      margin-left: 8px;
    }
  }
`;

const Step02 = ({ seats, playMovieInfo }) => {
  const viewGradeIconOptions = getViewGradeIconOptions(
    playMovieInfo.ViewGradeCode
  );
  return (
    <StepBlock>
      <SectionTitle title={'인원/좌석 선택'} />
      <PersonSeatCount>
        <div className="movie-info">
          <img src={playMovieInfo.PosterURL} alt="poster" />
          <div className="text-info">
            <div className="title">
              <ViewGradeIcon
                size={22}
                color={viewGradeIconOptions.color}
                text={viewGradeIconOptions.text}
              />
              <span>{playMovieInfo.MovieNameKR}</span>
            </div>
            <div className="detail-info">
              <div className="time">
                {`${playMovieInfo.divisions[0].times[0].PlayDt}(${playMovieInfo.divisions[0].times[0].PlayDayKR}) | ${playMovieInfo.divisions[0].times[0].StartTime}~${playMovieInfo.divisions[0].times[0].EndTime}`}
              </div>
              <div className="screen">{`${playMovieInfo.divisions[0].CinemaNameKR} | ${playMovieInfo.divisions[0].times[0].ScreenNameKR} | ${playMovieInfo.divisions[0].ScreenDivisionNameKR}`}</div>
            </div>
          </div>
        </div>
        <div className="person-count">
          <div className="adult"></div>
          <div className="student"></div>
          <div className="senior"></div>
          <div className="disabled"></div>
        </div>
      </PersonSeatCount>
      <div className="text-info">
        <p>{'- 인원을 선택하세요'}</p>
        {/* <p>{'- 좌석 선택 후 결제하기 버튼을 클릭하세요'}</p> */}
      </div>
      <ScreenBlock>
        <div className="screen">SCREEN</div>
        <SeatsBlock>
          {seats.map((seat) => (
            <Seat
              key={seat.SeatNo}
              x={seat.SeatXCoordinate / 5 - 50}
              y={seat.SeatYCoordinate / 5 - 60}
              status={seat.SeatStatusCode}
              sweetSpot={seat.SweetSpotYN === 'Y' ? true : false}
            />
          ))}
        </SeatsBlock>
      </ScreenBlock>
      <SeatsInfoBlock>
        <div className="seat-info-group">
          <div className="seat-info">
            <Seat size="small" status={0} /> <span>선택가능</span>
          </div>
          <div className="seat-info">
            <Seat size="small" status={50} /> <span>예매완료</span>
          </div>
        </div>
        <div className="seat-info-group">
          <div className="seat-info">
            <Seat size="small" status={30} /> <span>거리두기석</span>
          </div>
          <div className="seat-info">
            <Seat size="small" sweetSpot /> <span>스위트스팟</span>
          </div>
        </div>
      </SeatsInfoBlock>
    </StepBlock>
  );
};

export default Step02;
