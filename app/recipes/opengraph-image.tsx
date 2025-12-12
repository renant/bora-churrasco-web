import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Bora Churrasco - Receitas de Churrasco";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
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
            👨‍🍳
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: "56px",
              fontWeight: "bold",
              color: "#DC2626",
              marginBottom: "16px",
              lineHeight: 1.1,
            }}
          >
            Receitas de Churrasco
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: "32px",
              color: "#1F2937",
              marginBottom: "24px",
              maxWidth: "800px",
            }}
          >
            Aprenda a Fazer o Melhor Churrasco
          </div>

          {/* Features */}
          <div
            style={{
              display: "flex",
              gap: "40px",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "24px",
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
                fontSize: "24px",
                color: "#374151",
              }}
            >
              🍖 Molhos
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "24px",
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
          borachurrasco.app/recipes
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
