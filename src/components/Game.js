import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Item from "./Item";
import cookieSrc from "../cookie.svg";
import useInterval from "../hooks/use-interval.hook";
import useDocumentTitle from "../hooks/useDocumentTitle";
import useKeyDown from "../hooks/useKeyDown";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 },
];

const Game = () => {
  // TODO: Replace this with React state!
  const [numCookies, setNumCookies] = useState(1000);
  const [purchasedItems, setPurchasedItems] = useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
  });

  const handleClick = (id, cost) => {
    console.log("hello", cost);
    if (numCookies < cost) {
      window.alert("Not enough cookies!");
      return;
    } else {
      setNumCookies(numCookies - cost);
      setPurchasedItems({ ...purchasedItems, [id]: purchasedItems[id] + 1 });
    }
  };

  const calculateCookiesPerTick = () => {
    let numCookiesPerSec = 0;
    items.forEach((item) => {
      numCookiesPerSec += purchasedItems[item.id] * item.value;
    });
    return numCookiesPerSec;
  };

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
    setNumCookies(numCookies + numOfGeneratedCookies);
  }, 1000);

  const handleCookies = () => {
    setNumCookies(numCookies + 1);
  };

  useDocumentTitle(`${numCookies} cookies`, "Cookie Clicker Workshop");

  useKeyDown("space", handleCookies);

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          {/* TODO: Calcuate the cookies per second and show it here: */}
          <strong>0</strong> cookies per second
        </Indicator>
        <Button onClick={handleCookies}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle> Items:</SectionTitle>
        {/* TODO: Add <Item> instances here, 1 for each item type. */}
        {items.map((item, index) => {
          return (
            <Item
              index={index}
              key={item.id}
              item={item}
              numCookies={numCookies}
              purchasedItems={purchasedItems}
              handleClick={handleClick}
            />
          );
        })}
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`;

export default Game;
