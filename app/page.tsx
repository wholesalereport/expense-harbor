import {Gradient} from "@/src/components/gradient";
import {Container} from "@/src/components/container";
import {Navbar} from "@/src/components/navbar";
import { ChevronRightIcon } from '@heroicons/react/16/solid'
import { Button } from '@/src/components/button'

function Hero() {
    return (
        <div className="relative">
            <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-inset ring-black/5" />
            <Container className="relative">
                <Navbar />
                <div className="pb-24 pt-16 sm:pb-32 sm:pt-24 md:pb-48 md:pt-32">
                    <h1 className="font-display text-balance text-5xl/[0.9] font-medium tracking-tight text-gray-950 sm:text-7xl/[0.8] md:text-8xl/[0.8]">
                        Order Summary for Your Tax Return
                    </h1>
                    <p className="mt-8 max-w-lg text-xl/7 font-medium text-gray-950/75 sm:text-2xl/6">
                        Categorize expenses, generate detailed reports, and maximize your tax return.
                    </p>
                    <div className="mt-12 flex flex-col gap-x-6 gap-y-4 sm:flex-row">
                        <Button href="#">Get started</Button>
                        <Button variant="secondary" href="/pricing">
                            See pricing
                        </Button>
                    </div>
                </div>
            </Container>
        </div>
    )
}


export default function Home() {
  return (
      <div className="overflow-hidden">
        <Hero />
      </div>
      )
}