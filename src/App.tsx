import React, { useEffect, useState } from "react";
import axios from "axios";
type Props = {};

export default function App({}: Props) {
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const response = await axios("/feed");
    setData(response.data);
  };

  return <div>{JSON.stringify(data)}</div>;
}
