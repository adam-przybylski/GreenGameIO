import {FC, useEffect, useState} from "react";
import {api} from "../../api/api.config.ts";
import Modal from 'react-modal';
import "./index.css";
import {useUserContext} from "../../context/userContext.tsx";


interface DataItem {
    id: number;
    nazwa: string;
    opis: string;
    source: string;
}

Modal.setAppElement("#root");

const AwardsPage: FC = () => {
    Modal.setAppElement("#root"); // Ustawiamy element aplikacji dla react-modal

    const [apiData, setApiData] = useState<DataItem[] | null>(null);
    const [userPrzypietaOdznaka, setUserPrzypietaOznka] = useState<Number | null>(null);
    //const [apiPrivateData, setApiPivateData] = useState<DataItem[] | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<DataItem | null>(null);
    const [czyDodacPrzycisk, setCzyDodacPrzycisk] = useState(false);

    ///co???
    const { account } = useUserContext();
    useEffect(() => {
        api.get("/odznaki").then(response => {
            //console.log(response.data);
            setApiData(response.data);
        }).catch(function (error) {
                console.log(error);
            }
        );
        // api.get("/odznakaManager/user/2").then(response => {
        //     console.log(response.data);
        //     setApiPivateData(response.data);
        // })
    }, [])
    const handleImageClick = (item: DataItem) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedItem(null);
        setShowModal(false)
    };

    const handlePrzypnijOdznake = (idOdznakiDoPrzypiecia) => {
        api.get('/odznakaManager/przypnij?idUsera='+account?.id + '&idOdz='+ idOdznakiDoPrzypiecia).then(() => {
            console.log('Przypinam userowi: ', account?.id, ' odznake: ' + idOdznakiDoPrzypiecia);
            setUserPrzypietaOznka(idOdznakiDoPrzypiecia);
            setShowModal(false);
            setSelectedItem(null);
            setShowModal(false)
        })
    }

    const handleShowMyAwards = () => {
        api.get("/odznakaManager/user/"+ account?.id).then(response => {
            //console.log(response.data);
            setApiData(response.data); // Zapisujemy dane do nowej zmiennej
        }).catch(function (error) {
            console.log(error);
        });
        api.get('/users/id/'+ account?.id).then(response => {
            console.log('User ma przypieta: ', response.data.odznaka);
            setUserPrzypietaOznka(response.data.odznaka);
        }).catch(function (error) {
            console.log(error);
        })
        setCzyDodacPrzycisk(true);
    }

    return (
        <div className="text-center">
            <h1 className="enlarge-font">Odznaki</h1>
            <button className="my-button" onClick={handleShowMyAwards}>
                Moje Odznaki
            </button>
            {apiData && (
                <div className="flex-container">
                    {apiData.map((item) => (
                        <div key={item.id} className={czyDodacPrzycisk && item.id === userPrzypietaOdznaka ? "rectangle2" : "rectangle"} onClick={() => handleImageClick(item)}>
                            <img src={item.source} alt={`Obrazek dla ${item.nazwa}`} className="full-width-height" />
                        </div>
                    ))}
                </div>
            )}

            <Modal
                isOpen={showModal}
                onRequestClose={handleCloseModal}
                contentLabel="Example Modal"
                className={czyDodacPrzycisk ? "custom-modal2" : "custom-modal"}
                //className="custom-modal"
                overlayClassName="custom-overlay"
            >
                {selectedItem && (
                    <div>
                        <img src={selectedItem.source} alt={`Pełny obrazek dla ${selectedItem.nazwa}`} className="modal-image" />
                        <h2 className="modal-title">{selectedItem.nazwa}</h2>
                        <p className="modal-description">{selectedItem.opis}</p>
                        {czyDodacPrzycisk && <button  className="modal-button" onClick={() => handlePrzypnijOdznake(selectedItem?.id)}>Przypnij</button>  }
                        <button className="modal-button" onClick={handleCloseModal}>
                            Zamknij
                        </button>
                    </div>
                )}
            </Modal>
        </div>
    );
}
    export default AwardsPage;