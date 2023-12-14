import { FC } from "react";

const AwardsPage: FC = () => {
    return (
        <iframe
            src={`http://localhost:8081/awards/userPrzypinanieOdznakiIJegoOdznaki.html`}
            className="w-full h-full"
        />
    
    );
};

export default AwardsPage;