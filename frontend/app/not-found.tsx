"use client";

import { useRouter } from "next/navigation";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/Button";
import { IconError404Off } from "@tabler/icons-react";

export default function NotFound() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)] p-6">
        <div className="text-center">
          <IconError404Off size={125} className="mx-auto mb-6 text-gray-500" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Ops! A página que você procura não foi encontrada.
          </h1>
          <p className="text-gray-600 mb-8">
            A página que você está procurando pode ter sido removida ou o endereço está incorreto.
          </p>
          <div className="flex justify-center">
            <Button onClick={handleGoHome} variant="primary">
              Voltar a home
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

