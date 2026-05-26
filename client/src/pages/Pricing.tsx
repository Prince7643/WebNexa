import * as  React from 'react'
import { authClient } from '../lib/auth-client';
import { toast } from 'sonner';
import api from '../configs/axios';

const Pricing = () => {
    const [isYearly, setIsYearly] = React.useState(false);

    const pricingData = [
        {   
            planId: "Basic", amount: 0, description: "Always free", buttonText: "Start for free",
            features: ["Limited component access", "Free updates included", "Basic support"],
            highlighted: false
        },
        {
            planId: "Pro", amount: 19, discount: 10, description: "per month, billed annually", buttonText: "Startup plan",
            features: ["Full component library access", "AI-powered layout generation", "Unlimited personal projects", "Reusable blocks & sections", "Custom theming & tokens", "Export-ready production code", "Standard support"],
            highlighted: true
        },
        {
            planId: "Premium", amount: 49, discount: 15, description: "per month, billed annually", buttonText: "Premium plan",
            features: ["Everything in Growth", "Team collaboration", "Multiple team members", "Advanced AI workflows", "Design management", "Role-based access control", "Priority updates & access", "Dedicated support", "Long-term plan access"],
            highlighted: false
        }
    ];

    const calculateamount = (amount:any, discount:any) => {
        if (!isYearly || amount === 0) return amount;
        return Math.round(amount * (1 - discount / 100));
    };
    const {data:session} =  authClient.useSession()
    const handlePurchase=async ({planId}:any) => {
        try {
            if (!session?.user) return toast("Please login to purchase a plan")
            const {data} = await api.post('/api/user/purchase-credits',{planId})
            window.location.href = data.payment_link
        } catch (error) {
            toast.error("Failed to initiate purchase. Please try again.")
             console.error("Purchase initiation error:", error);
        }
    }
    return (
        <>
            <style>
                {`
                    @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
                    *{
                        font-family: "Poppins", sans-serif;
                    }
                `}
            </style>

            <section id='Pricing' className=" py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between mb-20">
                        <h1 className="text-base md:text-2xl lg:text-[32px]/10 font-medium text-white">
                            Start free.<br />
                            Upgrade when you're ready
                        </h1>
                        <div className="flex items-center gap-3">
                            <button onClick={() => setIsYearly(!isYearly)} className={`w-11 h-6 rounded-full transition-colors ${isYearly ? 'bg-emerald-600' : 'bg-emerald-100'} relative`}>
                                <div className={`w-4 h-4 rounded-full absolute top-1 left-1 transition-all ${isYearly ? 'translate-x-5 bg-white' : 'translate-x-0 bg-emerald-600'}`}></div>
                            </button>
                            <span className="text-sm text-neutral-300">Billed yearly</span>
                        </div>
                    </div>

                    {/* Pricing Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                        {pricingData.map((plan, index) => (
                            <div key={index} className={`w-full ${plan.highlighted ? 'lg:-mt-8 pt-8 px-0.5 pb-0.5 bg-neutral-600 rounded-2xl' : 'shadow-[0px_4px_4px_0px_rgba(0,0,0,0.05)] rounded-2xl'}`}>
                                <div className={`bg-white border border-neutral-200 rounded-2xl p-6 ${index === 0 ? 'pb-16' : ''}`}>

                                    <div className="mb-6">
                                        <p className="text-base font-medium text-neutral-800 mb-3">{plan.planId}</p>
                                        <div className="flex items-center gap-1">
                                            <span className="text-[28px] text-neutral-800">$</span>
                                            <span className="text-4xl font-semibold text-neutral-800">
                                                {calculateamount(plan.amount, plan.discount)}
                                            </span>
                                            {isYearly && plan.discount && (
                                                <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full ml-1">
                                                    SAVE {plan.discount}%
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-neutral-500 mt-1">{plan.description}</p>
                                    </div>

                                    {/* Button */}
                                    <button onClick={()=>handlePurchase(plan)} className={`w-full py-2 rounded-md text-sm mb-5 transition-colors cursor-pointer
                                        ${plan.highlighted
                                            ? 'bg-neutral-800 text-slate-50 hover:bg-neutral-700'
                                            : 'bg-slate-100 border border-slate-200 text-slate-900 hover:bg-slate-200'
                                        }`}
                                    >
                                        {plan.buttonText}
                                    </button>

                                    {/* Features */}
                                    <div className="space-y-3">
                                        {plan.features.map((feature, featureIndex) => (
                                            <div key={featureIndex} className="flex items-start gap-3">
                                                <svg width="12" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-1 shrink-0">
                                                    <path d="M12.576 1 4.618 8.333 1 5" stroke="#404040" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <span className="text-sm text-neutral-700">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Pricing