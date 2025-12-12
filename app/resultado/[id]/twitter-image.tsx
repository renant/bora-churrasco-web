import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Bora Churrasco - Calculadora de Churrasco";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const participantes = id;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #FEF3C7 0%, #FDBA74 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "40px",
          }}
        >
          {/* Icon */}
          <div
            style={{
              fontSize: "80px",
              marginBottom: "20px",
            }}
          >
            🥩
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              color: "#DC2626",
              marginBottom: "16px",
              lineHeight: 1.2,
            }}
          >
            Churrasco para
          </div>

          {/* Number of people - highlighted */}
          <div
            style={{
              fontSize: "120px",
              fontWeight: "bold",
              color: "#DC2626",
              marginBottom: "8px",
              lineHeight: 1,
            }}
          >
            {participantes}
          </div>

          <div
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              color: "#DC2626",
              marginBottom: "24px",
            }}
          >
            Pessoas
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: "28px",
              color: "#374151",
              marginBottom: "24px",
              maxWidth: "800px",
            }}
          >
            Quantidade exata de carnes, bebidas e acompanhamentos
          </div>

          {/* Features */}
          <div
            style={{
              display: "flex",
              gap: "40px",
              marginTop: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "22px",
                color: "#374151",
              }}
            >
              🥩 Carnes
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "22px",
                color: "#374151",
              }}
            >
              🍺 Bebidas
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "22px",
                color: "#374151",
              }}
            >
              ✨ Essenciais
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: "24px",
            fontSize: "20px",
            color: "#6B7280",
          }}
        >
          borachurrasco.app
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
