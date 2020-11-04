import React from "react";
import styled from "styled-components";

const Item = (props) => {
  const {
    item: { id, name, cost, value },
    purchasedItems,
    handleClick,
    index,
  } = props;

  return (
    <Button
      onClick={() => {
        handleClick(id, cost);
      }}
      autoFocus={index == 0}
    >
      <Wrapper>
        <ItemInfo>
          <Name>{name}</Name>
          <Text>
            Cost: {cost} cookie(s). Produces {value}
          </Text>
        </ItemInfo>
        <Number>{purchasedItems[id]}</Number>
      </Wrapper>
    </Button>
  );
};
const Button = styled.button`
  all: unset;
  cursor: pointer;
 
  }
`;

const Wrapper = styled.div`
  border-bottom: 2px solid;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ItemInfo = styled.div``;
const Name = styled.div`
  text-align: left;
`;
const Text = styled.div``;
const Number = styled.div`
  text-align: right;
  padding: 20px;
  font-size: 30px;
`;

export default Item;
