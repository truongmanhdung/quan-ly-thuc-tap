import { useEffect } from "react";

const ChartContainer = () => {
  useEffect(() => {
    document.title = "Chart - MoonFi Protocol";
  }, []);

  setTimeout(function () {
    document.querySelector(".loading-nn").classList.remove("active");
  }, 2500);
  return (
    <>
      <div className="loading-nn active">
        <div class="fade-loading"></div>
      </div>
      <div className="container-fluid" style={{ marginTop: "7rem" }}>
        {/* <iframe
          src="https://poocoin.app/tokens/0x3244b3b6030f374bafa5f8f80ec2f06aaf104b64"
          scrolling="yes"
          className="iframe-class"
          width="100%"
          height="925"
          frameBorder="0"
        ></iframe> */}
      </div>
    </>
  );
};
// https://pancakeswap.finance/info/token/0x3244b3b6030f374bafa5f8f80ec2f06aaf104b64
// https://pancakeswap.finance/swap?outputCurrency=0x3244B3B6030f374bAFA5F8f80Ec2F06aAf104B64
export default ChartContainer;
