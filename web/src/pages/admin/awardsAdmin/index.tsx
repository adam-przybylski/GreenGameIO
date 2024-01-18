import {FC, useEffect, useState} from "react";
import {api} from "../../../api/api.config.ts";
//import AdminQuizzes from "../quizzesAdmin";

const AwardsAwards: FC = () => {
    const [fileNames, setFileNames] = useState<string[]>(["test1.png", "test2.png",
    "test3.png", "test4.png", "test5.png", "test6.png", "test7.png", "test8.png", "test9.png", "test10.png", "test11.png", "test12.png",
        "test13.png", "test14.png"]);
    const [index, setIndex] = useState(0);
    const [textInputValue1, setTextInputValue1] = useState("");
    const [textInputValue2, setTextInputValue2] = useState("");
    //const [odznaki, setOdznaki] = useState<string[]>([])
    //const [apiData, setApiData] = useState<Odznaki[] | null>(null);
    const doPrzodu = () => {
        setIndex((index+1)%14)
    }

    const doTylu = () => {
        setIndex(prevIndex => (prevIndex - 1 + fileNames.length) % fileNames.length)
    }

    const handleInputChange1 = (e) => {
        setTextInputValue1(e.target.value);
    };

    const handleInputChange2 = (e) => {
        setTextInputValue2(e.target.value);
    };

    const handleOkClick = () => {
        api.get('/odznakaManager/dodajOdznake?nazwa='+textInputValue1+'&opis='+textInputValue2+'&src='+fileNames[index]).then(() => {
            console.log("Wprowadzony tekst z inputa 1:", textInputValue1)
            setTextInputValue1("");
            setTextInputValue2("");
            console.log("Wprowadzony tekst z inputa 2:", textInputValue2)
            }
        );

    };

    return (
        <div style={{ alignItems: "center" }}>
            <h2 style={{ fontSize: "24px", fontWeight: "bold", textAlign: "center"}}>Panel Tworzenia Odznak</h2>
            <div style={{ border: "4px solid #00ff00", padding: "20px", margin: "auto", height: "600px", width: "400px"}}>
                <img src={fileNames[index]} alt="Zdjęcie odznaki" style={{ width: "70%", height: "60%",  margin: "auto" }} />
                <div style={{margin: "auto", width: "240px"}}>
                    <button style={{width: "100px", height: "50px", backgroundColor: "forestgreen", margin: "10px"}} onClick={doTylu} >Poprzednia</button>
                    <button style={{width: "100px", height: "50px", backgroundColor: "forestgreen", margin: "10px"}} onClick={doPrzodu}>Nastepna</button>
                    <input type="text" placeholder="Wprowadź tekst" onChange={handleInputChange1} value={textInputValue1} style={{ width: "220px", height: "30px", margin: "10px", border: "2px solid #00ff00", borderRadius: "5px" }} />
                    <input type="text" placeholder="Wprowadź tekst" onChange={handleInputChange2} value={textInputValue2} style={{ width: "220px", height: "30px", margin: "10px", border: "2px solid #00ff00", borderRadius: "5px" }} />
                    <button style={{width: "220px", height: "50px", backgroundColor: "#00ff00", margin: "10px"}} onClick={handleOkClick}>Nastepna</button>
                </div>

            </div>
        </div>
    );


}

export default AwardsAwards;