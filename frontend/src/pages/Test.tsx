import { useEffect } from "react";
import { authService } from "../services/api";

function Test() {
  useEffect(() => {
    (async () => {
      const tests = await authService.getAllTests();
      console.log(tests);
      window.alert(tests);
    })();
  },[]);
  return <div>tesfsdfdfdfdt</div>;
}

export default Test;
