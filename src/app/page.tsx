import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Bot, BarChart, Zap } from 'lucide-react';
import ChatWidget from '@/components/chat/chat-widget';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Logo } from '@/components/logo';

const features = [
  {
    icon: <Bot className="w-8 h-8 text-accent" />,
    title: 'AI-Powered Responses',
    description: 'Leverage cutting-edge AI to provide instant, accurate answers to customer questions, 24/7.',
  },
  {
    icon: <Zap className="w-8 h-8 text-accent" />,
    title: 'Lead Generation',
    description: 'Automatically identify and capture promising leads, seamlessly integrating with your sales workflow.',
  },
  {
    icon: <BarChart className="w-8 h-8 text-accent" />,
    title: 'Actionable Analytics',
    description: 'Gain insights from a powerful dashboard tracking engagement, resolution rates, and top queries.',
  },
  {
    icon: <CheckCircle2 className="w-8 h-8 text-accent" />,
    title: 'Easy Integration',
    description: 'Embed our smart chatbot into your website with a single, simple line of code. No hassle.',
  },
];

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === "1");
  const featureImage = PlaceHolderImages.find(p => p.id === "2");

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <a className="flex items-center justify-center" href="#">
          <Logo className="h-6 w-6" />
          <span className="ml-2 font-semibold text-lg">BizChatPlug</span>
        </a>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button variant="ghost" asChild>
            <a href="/dashboard">Admin Dashboard</a>
          </Button>
          <Button asChild>
            <a href="#">Get Started</a>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-card">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    Supercharge Your Website with AI
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    BizChatPlug is the plug-and-play AI chatbot that automates support, captures leads, and provides you with actionable insights.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <a href="#">
                      Request a Demo
                    </a>
                  </Button>
                </div>
              </div>
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  width={600}
                  height={400}
                  alt="Hero"
                  data-ai-hint={heroImage.imageHint}
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                />
              )}
            </div>
          </div>
        </section>
        
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Everything You Need to Succeed</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our AI chatbot is packed with features to help you grow your business and keep your customers happy.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-4 mt-12">
              {features.map((feature) => (
                <Card key={feature.title} className="h-full">
                  <CardHeader className="flex flex-col items-center text-center">
                    {feature.icon}
                    <CardTitle className="mt-4">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">See It in Action</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore how our analytics dashboard provides a clear view of your customer interactions, helping you make data-driven decisions.
              </p>
              <Button asChild>
                <a href="/dashboard">Explore The Dashboard</a>
              </Button>
            </div>
             {featureImage && (
                <Image
                  src={featureImage.imageUrl}
                  width={600}
                  height={400}
                  alt="Feature"
                  data-ai-hint={featureImage.imageHint}
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                />
              )}
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 BizChatPlug. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </a>
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </a>
        </nav>
      </footer>
      <ChatWidget />
    </div>
  );
}
