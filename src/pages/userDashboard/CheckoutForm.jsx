import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import { AuthContext } from "../../firebase/AuthProvider";
import axios from "axios";

const CheckoutForm = () => {
    const {user}=useContext(AuthContext)
    const [errors,seterrors]=useState('')
    const [clientsecret,setclientsecret]=useState('')
    console.log(clientsecret,'client secret')
    const stripe=useStripe()
    const elements=useElements()
    const price=200
    useElements(()=>{
        axios.post('http://localhost:5000/payment_intent',{price:price})
        .then(res=>{
            const secret=(res.data.clientSecreat)
            console.log(secret,'secret data')
            setclientsecret(secret)
        })
        .catch(error=>console.log(error))
    },[])
    const handlesubmit=async(event)=>{
       event.preventDefault()
       if(!stripe || !elements){
        return
       }
       const card=elements.getElement(CardElement)
       if(card === null){
         return
       }
       const {error,PaymentMethod}=await stripe.createPaymentMethod({
        type:'card',
        card:card
       })
       if(error){
        console.log('payment error',error)
        seterrors(error.message)
       }
       else{
        console.log('payment method',PaymentMethod)
        seterrors('')
       }
       const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientsecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || 'anonymous',
            name: user?.displayName || 'anonymous'
          }
        }
      });
  
      if (confirmError) {
        console.log('confirm error', confirmError);
      } else {
        console.log('payment Intent', paymentIntent);
      }
    }
    return (
        <div>
            <form onSubmit={handlesubmit}>
                <CardElement 
                options={{
                    style:{
                        base:{
                            fontSize:'16px',
                            color:'#424770',
                            '::placeholder':{
                                color:'#aab7c4'
                            },
                        },
                        invalid:{
                            color:'#9e2146',
                        }
                    }
                }}>
                </CardElement>
                    <button className="btn bg-blue-300 " type='submit' >pay</button>
                    <p className="text-red-400">{errors}</p>
            </form>
        </div>
    );
};

export default CheckoutForm;