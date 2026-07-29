import { motion } from "framer-motion";

import {
  ShieldCheck,
  Wallet,
  ArrowRightLeft,
  ChartColumnIncreasing,
  CheckCircle2,
} from "lucide-react";

export const AuthBanner = () => {
  return (
    <div
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden

        bg-gradient-to-br
        from-slate-950
        via-indigo-900
        to-violet-900
      "
    >
      

      <div
        className="
          absolute
          -left-32
          top-0
          h-96
          w-96
          rounded-full
          bg-indigo-500
          opacity-20
          blur-3xl
        "
      />

      <div
        className="
          absolute
          bottom-0
          right-0
          h-96
          w-96
          rounded-full
          bg-cyan-500
          opacity-20
          blur-3xl
        "
      />

      

      <div
        className="
          relative
          z-10

          flex
          min-h-screen
          w-full
          flex-col

          px-8
          py-6

          xl:px-12
          xl:py-8

          2xl:px-16
          2xl:py-10
        "
      >
       

        <motion.div
          initial={{
            opacity: 0,
            y: -25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="flex items-center gap-3"
        >
          <div
            className="
              rounded-2xl
              bg-white/10
              p-3
              backdrop-blur-xl

              xl:p-4
            "
          >
            <Wallet
              className="
                h-7
                w-7
                text-white

                xl:h-8
                xl:w-8
              "
            />
          </div>

          <div>
            <h1
              className="
                text-2xl
                font-bold
                text-white

                xl:text-3xl
              "
            >
              FabPay
            </h1>

            <p
              className="
                text-sm
                text-slate-300

                xl:text-base
              "
            >
              Smart Digital Wallet
            </p>
          </div>
        </motion.div>

       

        <motion.div
          initial={{
            opacity: 0,
            x: -40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            delay: 0.2,
            duration: 0.7,
          }}
          className="
            mt-6

            xl:mt-8

            2xl:mt-10
          "
        >
          {/* Trust Badge */}

          <span
            className="
              inline-flex
              items-center
              gap-2

              rounded-full
              bg-white/10

              px-4
              py-2

              text-sm
              text-indigo-100

              backdrop-blur-sm
            "
          >
            <ShieldCheck size={18} />

            Trusted by Thousands
          </span>

          {/* Heading */}

          <h2
            className="
              mt-5

              text-5xl
              font-extrabold
              leading-[1.05]
              tracking-tight
              text-white

              xl:mt-6
              xl:text-6xl

              2xl:text-7xl
            "
          >
            Banking
            <br />
            Reimagined.
          </h2>

          

          <p
            className="
              mt-4
              max-w-xl

              text-base
              leading-7
              text-slate-300

              xl:mt-5
              xl:text-lg
              xl:leading-8
            "
          >
            Secure digital payments, instant transfers,
            transaction tracking and a premium banking
            experience — all in one application.
          </p>
        </motion.div>

        {/* Feature Cards */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.4,
            duration: 0.8,
          }}
          className="
            mt-5
            space-y-3

            xl:mt-6
            xl:space-y-3
          "
        >
          {/* Instant Transfers */}

          <div
            className="
              rounded-2xl
              border
              border-white/10
              bg-white/10
              p-4
              backdrop-blur-xl

              xl:rounded-3xl
              xl:p-4
            "
          >
            <div className="flex items-center gap-4">
              <div
                className="
                  rounded-xl
                  bg-indigo-600
                  p-3
                "
              >
                <ArrowRightLeft className="text-white" />
              </div>

              <div>
                <h3 className="font-semibold text-white">
                  Instant Transfers
                </h3>

                <p className="text-sm text-slate-300">
                  Send money securely in seconds.
                </p>
              </div>
            </div>
          </div>

          

          <div
            className="
              rounded-2xl
              border
              border-white/10
              bg-white/10
              p-4
              backdrop-blur-xl

              xl:rounded-3xl
              xl:p-4
            "
          >
            <div className="flex items-center gap-4">
              <div
                className="
                  rounded-xl
                  bg-green-600
                  p-3
                "
              >
                <CheckCircle2 className="text-white" />
              </div>

              <div>
                <h3 className="font-semibold text-white">
                  99.99% Success Rate
                </h3>

                <p className="text-sm text-slate-300">
                  Reliable and secure transactions.
                </p>
              </div>
            </div>
          </div>

          {/* Smart Analytics */}

          <div
            className="
              rounded-2xl
              border
              border-white/10
              bg-white/10
              p-4
              backdrop-blur-xl

              xl:rounded-3xl
              xl:p-4
            "
          >
            <div className="flex items-center gap-4">
              <div
                className="
                  rounded-xl
                  bg-purple-600
                  p-3
                "
              >
                <ChartColumnIncreasing className="text-white" />
              </div>

              <div>
                <h3 className="font-semibold text-white">
                  Smart Analytics
                </h3>

                <p className="text-sm text-slate-300">
                  Monitor your spending with insights.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.7,
          }}
          className="
            mt-auto
            pt-4
            pb-2
          "
        >
          <p className="text-sm text-slate-400">
            © 2026 FabPay

            <span className="mx-2">
              •
            </span>

            Secure Banking Platform
          </p>
        </motion.div>
      </div>
    </div>
  );
};