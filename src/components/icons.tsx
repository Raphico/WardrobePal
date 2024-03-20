/** Originally from `skateshop`
 * @link https://github.com/sadmann7/skateshop/blob/main/src/components/icons.tsx
 */

export type IconProps = React.HTMLAttributes<SVGElement>

export const Icons = {
  logo: (props: IconProps) => (
    <svg
      viewBox="0 0 40 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.1625 6.84367C16.9688 6.84367 17.6375 6.19367 17.6564 5.375V5.34375C17.6564 5.25008 17.6625 5.15625 17.675 5.06875C17.6814 4.96242 17.7 4.86875 17.7313 4.76875C17.9814 3.75617 18.9064 3 20.0062 3C20.3187 3 20.6126 3.06258 20.8875 3.175C21.7375 3.51875 22.3438 4.36242 22.3438 5.34375V5.375C22.3438 5.46867 22.3374 5.5625 22.3249 5.65C22.3124 5.74367 22.2938 5.8375 22.275 5.92492C22.275 5.94367 22.2687 5.95617 22.2625 5.96875C21.9998 6.97492 21.0874 7.71875 19.9936 7.71875C19.6875 7.71875 19.5703 7.52844 19.1187 7.54375C18.7303 7.55687 18.5 7.93742 18.5 8.20625V11.7562C18.5 11.9375 18.5374 12.1187 18.6 12.2813C19.0311 12.225 19.4999 12.1937 20.0062 12.1937C20.5064 12.1937 20.9751 12.225 21.4 12.2813C21.4625 12.1187 21.5 11.9376 21.5 11.7562V10.475C22.5377 10.175 23.4626 9.55625 24.1438 8.7125C24.825 7.88133 25.2313 6.8625 25.3251 5.8C25.3376 5.6625 25.3437 5.51875 25.3437 5.37508V5.34383C25.3437 2.91891 23.7187 0.862578 21.5 0.218828C21.025 0.0749218 20.525 0 20.0062 0C19.4813 0 18.975 0.0749218 18.5 0.218828C16.4125 0.825078 14.85 2.68133 14.675 4.91867C14.6625 5.05633 14.6561 5.20008 14.6561 5.34383V5.37508C14.6751 6.19367 15.3437 6.84367 16.1625 6.84367Z"
        fill="currentColor"
      />
      <path
        d="M28.0771 32.0945L27.9606 31.9615H12.0399L11.9232 32.0944C11.15 32.9763 10.4797 33.7373 9.8741 34.4205L9.29871 35.0699H30.7014L30.1262 34.4207C29.5053 33.7199 28.8159 32.9371 28.0771 32.0945Z"
        fill="currentColor"
      />
      <path
        d="M39.4476 34.9352C37.6901 32.7422 28.5396 22.2198 25.3786 19.041C25.356 17.3389 24.9742 16.2615 24.1494 15.5603C23.3236 14.8586 22.0438 14.3156 20 14.3156C17.9562 14.3156 16.6766 14.8585 15.8507 15.5603C15.0258 16.2614 14.644 17.3389 14.6215 19.041C11.4601 22.2202 2.30967 32.7424 0.55248 34.9352C-0.012676 35.6402 -0.156426 36.5108 0.177715 37.2067C0.461386 37.7974 1.04701 38.15 1.74443 38.15C2.51076 38.15 3.3692 37.7384 4.22693 36.9598C6.7117 34.7043 18.0946 23.8067 20 21.9816C21.9054 23.8067 33.2883 34.7043 35.773 36.9598C36.8567 37.9436 37.7211 38.15 38.2554 38.15H38.2556C38.9531 38.15 39.5387 37.7973 39.8222 37.2069C40.1564 36.5108 40.0128 35.6404 39.4476 34.9352Z"
        fill="CurrentColor"
      />
    </svg>
  ),
  gitHub: (props: IconProps) => (
    <svg viewBox="0 0 438.549 438.549" {...props}>
      <path
        fill="currentColor"
        d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
      ></path>
    </svg>
  ),
  x: (props: IconProps) => (
    <svg
      width="23"
      height="23"
      viewBox="0 0 1200 1227"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
    </svg>
  ),
  google: ({ ...props }: IconProps) => (
    <svg role="img" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
      />
    </svg>
  ),
  spinner: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ),
  menu: ({ ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      {...props}
    >
      <path
        d="M3 5H11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M3 12H16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M3 19H21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  ),
  close: ({ ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  ),
}
