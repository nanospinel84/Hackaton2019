import React from "react";
import PropTypes from "./propTypes";
import classNames from "classnames";
import { Card, CardTitle, CardSubtitle, CardText, CardBody } from "reactstrap";
import Avatar from "./Avatar";

const UserCard = ({
  avatar,
  avatarSize,
  title,
  subtitle,
  userId,
  text,
  children,
  className,
  ...restProps
}) => {
  const classes = classNames("bg-gradient-theme", className);

  return (
    <Card inverse className={classes} {...restProps}>
      <CardBody>
        <Avatar src={avatar} size={avatarSize} className="mb-2" />
        <CardTitle style={{ color: "black" }}>{title}</CardTitle>
        <hr/>
        <CardSubtitle style={{ color: "black" }}>{subtitle}</CardSubtitle>
        <CardText>
          <small>{text}</small>
        </CardText>
      </CardBody>
      {children}
    </Card>
  );
};

UserCard.propTypes = {
  avatar: PropTypes.string,
  avatarSize: PropTypes.number,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  userId: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string
};

UserCard.defaultProps = {
  avatarSize: 80
};

export default UserCard;
