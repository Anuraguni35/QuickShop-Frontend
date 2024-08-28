// import NavBar from "@/Components/component/navBar";
import "./WelcomePage.css";
import img from "../../assets/logo1.png";
import { FlipWords } from "../../Components/ui/flip-words";
import { useNavigate} from "react-router-dom";
 
function WelcomePage() {
  const navigation = useNavigate()
  const WelcomeHead = ["Welcome to", "SignUp", "Explore"];
 
  const WelcomeArr = [
    "Discover a world of endless possibilities at QuickShop, your ultimate online shopping destination. We are thrilled to have you here!",
    "Stay updated with the latest trends and bestsellers. Don’t miss out on our exclusive collections and limited-time offers!",
    "Sign up for our newsletter to receive updates on new arrivals, special promotions, and exclusive deals. Follow us on social media and be part of our vibrant community of shoppers",
  ];
  return (
    <div style={{ height: "100vh", backgroundColor: "black" }}>
      <div className="midSectionContainerWelcomePage">
        <div
          className="h-20 sticky top-0 right-0 left-0 "
          style={{
            backdropFilter: "blur(4px)",
            backgroundColor: "#2626264a",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingRight: "10px",
            paddingLeft: "10px",
          }}
        >
          {" "}
          <img src={img} style={{ height: "50px" }} />
        </div>

        <div
          style={{
            // height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
          }}
          className=""
        >
          <div
            style={{
              // backgroundColor: "red",
              
              maxWidth: "35%",
              // width: "30%",
              minWidth:"30%",
              borderRadius: "20px",
              marginTop: "50px",
              marginRight: "80px",
              backdropFilter: "blur(4px)",
              backgroundColor: "#9795ff30",
              padding: 20,
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div  className="font-mono" style={{fontFamily: "Poppins", color:"#111827", fontSize:"2.5vw",fontWeight:"500",display:'flex',flexDirection:"row",flexWrap:"nowrap"  }}>
              <FlipWords  className="text-zinc-900 flex-nowrap" words={WelcomeHead} />
              QuickShop
            </div>
            <div style={{}}>
              {WelcomeArr.map((item, index) => (
                <p
                  style={{ margin: 10,color:"white",fontSize:"1vw" }}
                  key={index}
                  className="text-white text-sm font-medium Consolas"
                >
                  {item}
                </p>
              ))}
              <button
              onClick={()=>{navigation("/auth/login")}}
                style={{ width: "100%" }}
                className="mb-7 mt-7 rounded-2xl px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
              >
                Login
              </button>
              <button
              onClick={()=>{navigation("/auth/signup")}}
                style={{ width: "100%" }}
                className="mb-7   rounded-2xl px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="  "
        style={{ height: "30vh", backdropFilter: "blur(10px)" }}
      ></div>
    </div>
  );
}

export default WelcomePage;
