import React from 'react'

interface LinguicaIconProps {
  size?: number
  color?: string
  className?: string
}

const LinguicaIcon: React.FC<LinguicaIconProps> = ({
  size = 60,
  color = 'orange',
  className = '',
}) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={color}
        d="m286.754 437.126-17.17-3.126a56.22 56.22 0 0 0 -38.541-60.6 166.259 166.259 0 0 1 -107.468-208.817 56.232 56.232 0 0 0 -24.05-64.944l6.976-11.17a21.069 21.069 0 0 0 -24.957-31 9.119 9.119 0 0 1 -7.988-.934l-2.116-1.375a21.069 21.069 0 0 0 -31.55 24.059l5.654 17.771c-.373.182-.751.352-1.122.543a55.784 55.784 0 0 0 -27.773 32.787 278.655 278.655 0 0 0 180.13 350.005 55.8 55.8 0 0 0 42.821-3.545c.151-.078.295-.165.447-.244l11.153 18.394a19.18 19.18 0 0 0 16.5 9.373 19.976 19.976 0 0 0 4.085-.425 19.213 19.213 0 0 0 15.29-16.425l1.121-8.312a7.434 7.434 0 0 1 3.967-5.617 19.429 19.429 0 0 0 -5.4-36.4zm-232.287-371.506a8.879 8.879 0 0 1 10.438-.4l2.116 1.38a21.185 21.185 0 0 0 18.56 2.171 9.069 9.069 0 0 1 10.742 13.342l-7.714 12.352c-.455-.159-.9-.329-1.366-.477a55.774 55.774 0 0 0 -30.409-1.095l-5.509-17.312a8.879 8.879 0 0 1 3.142-9.961zm179.643 400.49a43.849 43.849 0 0 1 -33.669 2.787 266.653 266.653 0 0 1 -172.364-334.915 44.14 44.14 0 1 1 84.07 26.939 178.259 178.259 0 0 0 115.234 223.906 44.141 44.141 0 0 1 6.729 81.283zm52.562-3.259a19.44 19.44 0 0 0 -10.372 14.687l-1.12 8.313a7.429 7.429 0 0 1 -13.716 2.858l-11.433-18.861a55.672 55.672 0 0 0 16.758-24.156l17.823 3.241a7.429 7.429 0 0 1 2.065 13.918z"
      />
      <path
        fill={color}
        d="m40.5 202.748a5.8 5.8 0 0 0 -6-5.748h-.009a5.793 5.793 0 0 0 -5.991 5.764 279.057 279.057 0 0 0 35.161 134.788 5.942 5.942 0 0 0 5.252 3.028 6.009 6.009 0 0 0 2.906-.786 5.877 5.877 0 0 0 2.334-8.052 267.082 267.082 0 0 1 -33.653-128.994z"
      />
      <path
        fill={color}
        d="m34.96 185.227c.173.014.345.022.516.022a6 6 0 0 0 5.971-5.492c.3-3.487.668-7.009 1.1-10.468a6 6 0 1 0 -11.906-1.495c-.455 3.617-.842 7.3-1.153 10.945a6 6 0 0 0 5.472 6.488z"
      />
      <path
        fill={color}
        d="m169.128 166.419a279.518 279.518 0 0 0 74.654 117.745 6 6 0 1 0 8.218-8.748 267.49 267.49 0 0 1 -71.45-112.674 6 6 0 1 0 -11.422 3.677z"
      />
      <path
        fill={color}
        d="m172.368 130.484a6 6 0 1 0 -11.795 2.211c.675 3.6 1.43 7.226 2.243 10.775a6 6 0 0 0 11.7-2.681c-.781-3.389-1.502-6.861-2.148-10.305z"
      />
      <path
        fill={color}
        d="m486.657 311.028-17.3 2.266a56.223 56.223 0 0 0 -55.2-45.954c-91.566 0-166.061-74.495-166.061-166.062a56.231 56.231 0 0 0 -42.721-54.507l3.235-12.766a21.069 21.069 0 0 0 -33.229-21.905 9.121 9.121 0 0 1 -7.894 1.548l-2.432-.663a21.069 21.069 0 0 0 -22.7 32.539l11.01 15.484a57.548 57.548 0 0 0 -17.546 41.473 277.093 277.093 0 0 0 14.531 87.605 6 6 0 0 0 11.376-3.83 265.169 265.169 0 0 1 -13.908-84.037c-.085-24.229 19.628-44.927 43.857-45.079a44.19 44.19 0 0 1 44.423 44.14c0 98.071 79.694 177.879 177.723 178.062 24.373.045 44.532 19.865 44.479 44.238a44.192 44.192 0 0 1 -44.141 44.044c-103.32 0-193.079-59.14-237.226-145.342a5.989 5.989 0 0 0 -7.539-2.832 6.007 6.007 0 0 0 -3.14 8.313c45.976 89.765 139.301 151.437 246.801 151.856a57.408 57.408 0 0 0 40.882-17.041l16.5 14.346a19.3 19.3 0 0 0 12.7 4.815 19.5 19.5 0 0 0 9.628-2.572 19.216 19.216 0 0 0 9.548-20.308l-1.469-8.258a7.431 7.431 0 0 1 2.064-6.559 19.429 19.429 0 0 0 -16.25-33.014zm-289.681-279.971-3.576 14.117c-.472-.012-.942-.037-1.418-.037a54.692 54.692 0 0 0 -29.182 8.434l-10.669-15a9.069 9.069 0 0 1 9.769-14.009l2.433.662a21.2 21.2 0 0 0 18.338-3.6 9.069 9.069 0 0 1 14.3 9.429zm297.453 304.493a19.444 19.444 0 0 0 -5.4 17.153l1.47 8.258a7.428 7.428 0 0 1 -12.188 6.908l-16.841-14.644a54.77 54.77 0 0 0 8.78-27.946l17.967-2.353a7.429 7.429 0 0 1 6.213 12.624z"
      />
    </svg>
  )
}

export default LinguicaIcon
