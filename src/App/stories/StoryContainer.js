import React from "react";
import Container from "reactstrap/es/Container";
import styles from "../App.module.scss";

export function StoryContainer({ children }){
  return (
    <Container className={styles.container}>
      {children}
    </Container>
  )
}
