import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  /* displays one git repo beside the other */
  flex-direction: row;
  /* keep all objects centered */
  justify-content: center;

  margin-top: 50px;
`;

export const Repository = styled.div`
  width: 250px;
  background: #fff;
  border-radius: 3px;
  margin: 0 10px;

  display: flex;
  /* displays one info bellow the other */
  flex-direction: column;

  header {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 64px;
    }

    strong {
      font-size: 24px;
      margin-top: 10px;
    }

    small {
      font-size: 14px;
      color: #666;
    }
  }

  ul {
    /* remove markers from the list */
    list-style: none;

    li {
      font-weight: bold;
      padding: 12px 20px;

      small {
        font-weight: normal;
        font-size: 12px;
        color: #999;
        font-style: italic;
      }

      /* apply this specific style to the background of every odd-indexed list member */
      &:nth-child(2n -1) {
        background: #f5f5f5;
      }
    }
  }

  footer {
    display: flex;
    flex-direction: row;
    align-items: center;

    button.delete {
      /* this fixed width causes the button not to resize regardless of
    it's label content (as different content has different sizes) */
      width: 40px;
      height: 10px;
      padding: 0 10px;
      margin-left: 5px;
      background: #ff0000;
      color: #fff;
      border: 0;
      font-size: 10px;
      font-weight: bold;
      border-radius: 2px;
      cursor: pointer;
    }
    button.refresh {
      /* this fixed width causes the button not to resize regardless of
    it's label content (as different content has different sizes) */
      width: 40px;
      height: 10px;
      padding: 0 10px;
      margin-left: 5px;
      background: #90ee90;
      color: #fff;
      border: 0;
      font-size: 10px;
      font-weight: bold;
      border-radius: 2px;
      cursor: pointer;
    }
  }
`;
