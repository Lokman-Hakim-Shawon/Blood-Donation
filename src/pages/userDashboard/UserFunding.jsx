import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise=loadStripe('pk_test_51OEW7EI6cjnocjvLNVUPfJOul56SrgLLOK6RPpQLB70Tqbf67AsA89ZJCTBqzoJtZN3cVNCG5ljLaJgqONWyH6v500k3RkF2hT')
const UserFunding = () => {
    return (
        <div>
            <h1 className="text-4xl font-bold text-center bg-blue-200 py-10">Funding For this Organisation</h1>
            <div className="my-20 border border-2 py-5 rounded-xl">
            <Elements stripe={stripePromise}>
            <CheckoutForm></CheckoutForm>
            </Elements>
            </div>
        </div>
    );
};

export default UserFunding;