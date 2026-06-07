"use client";

import { useEffect, useRef } from "react";

// ── Shared vertex shader ───────────────────────────────────────────────────────

const vert = /* glsl */ `void main() { gl_Position = vec4(position, 1.0); }`;

// ── Dark fluid shader (hero background) ───────────────────────────────────────

const fragDark = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2  uResolution;

  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x,289.0); }
  float snoise(vec2 v) {
    const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
    vec2 i=floor(v+dot(v,C.yy)); vec2 x0=v-i+dot(i,C.xx);
    vec2 i1=(x0.x>x0.y)?vec2(1.,0.):vec2(0.,1.);
    vec4 x12=x0.xyxy+C.xxzz; x12.xy-=i1;
    i=mod(i,289.); vec3 p=permute(permute(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));
    vec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);
    m=m*m; m=m*m;
    vec3 x=2.*fract(p*C.www)-1.; vec3 h=abs(x)-.5;
    vec3 ox=floor(x+.5); vec3 a0=x-ox;
    m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
    vec3 g; g.x=a0.x*x0.x+h.x*x0.y; g.yz=a0.yz*x12.xz+h.yz*x12.yw;
    return 130.*dot(m,g);
  }
  float fbm(vec2 p){ float f=0.,w=.5; for(int i=0;i<5;i++){ f+=w*snoise(p); p=p*2.1+vec2(1.3,1.7); w*=.5; } return f; }

  void main(){
    vec2 uv=gl_FragCoord.xy/uResolution; float t=uTime*0.055;
    vec2 q=vec2(fbm(uv+t*.4),fbm(uv+vec2(5.2,1.3)));
    vec2 r=vec2(fbm(uv+4.*q+vec2(1.7,9.2)+.15*t),fbm(uv+4.*q+vec2(8.3,2.8)+.13*t));
    float f=.5+.5*fbm(uv+4.*r+t*.08);
    vec3 c0=vec3(.047,.039,.031), c1=vec3(.082,.071,.059), ochre=vec3(.788,.584,.271);
    vec3 col=mix(c0,c1,clamp(f*2.2,0.,1.));
    col+=ochre*smoothstep(.82,1.,f)*.06;
    float vig=1.-smoothstep(.25,1.1,length(uv-.5)*2.);
    col*=vig;
    gl_FragColor=vec4(col,1.);
  }
`;

// ── Rainbow lens / prism shader (films section background) ────────────────────

const fragRainbow = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2  uResolution;

  // HSL → RGB (smooth, no banding)
  vec3 hsl2rgb(float h, float s, float l){
    h=fract(h);
    vec3 rgb=clamp(abs(mod(h*6.+vec3(0.,4.,2.),6.)-3.)-1.,0.,1.);
    return l+s*(rgb-.5)*(1.-abs(2.*l-1.));
  }

  vec3 permute(vec3 x){ return mod(((x*34.)+1.)*x,289.); }
  float snoise(vec2 v){
    const vec4 C=vec4(.211324865405187,.366025403784439,-.577350269189626,.024390243902439);
    vec2 i=floor(v+dot(v,C.yy)); vec2 x0=v-i+dot(i,C.xx);
    vec2 i1=(x0.x>x0.y)?vec2(1.,0.):vec2(0.,1.);
    vec4 x12=x0.xyxy+C.xxzz; x12.xy-=i1;
    i=mod(i,289.); vec3 p=permute(permute(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));
    vec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);
    m=m*m; m=m*m;
    vec3 x=2.*fract(p*C.www)-1.; vec3 h=abs(x)-.5;
    vec3 ox=floor(x+.5); vec3 a0=x-ox;
    m*=1.79284291400159-.85373472095314*(a0*a0+h*h);
    vec3 g; g.x=a0.x*x0.x+h.x*x0.y; g.yz=a0.yz*x12.xz+h.yz*x12.yw;
    return 130.*dot(m,g);
  }
  float fbm(vec2 p){ float f=0.,w=.5; for(int i=0;i<5;i++){ f+=w*snoise(p); p=p*2.1+vec2(1.3,1.7); w*=.5; } return f; }

  void main(){
    vec2 uv = gl_FragCoord.xy / uResolution;
    // Slow time — this is atmosphere, not a lightshow
    float t = uTime * 0.032;

    // Domain-warped FBM for organic flow
    vec2 q = vec2(fbm(uv + t * 0.5), fbm(uv + vec2(5.2, 1.3)));
    vec2 r = vec2(fbm(uv + 4.0*q + vec2(1.7,9.2) + t),
                  fbm(uv + 4.0*q + vec2(8.3,2.8) + t*0.8));
    float f = 0.5 + 0.5 * fbm(uv + 4.0*r + t*0.06);

    // Hue: slow sweep through 70% of spectrum — cinematic bias
    // Lands on warm golds, deep purples, muted teals — avoids neon green
    float hue = f * 0.72 + t * 0.018;

    // Chromatic aberration: like a prism splitting white light
    // Each channel gets its own hue offset
    float dh = 0.09;
    float sat = 0.75, lum = 0.40;
    vec3 col;
    col.r = hsl2rgb(hue,          sat, lum + 0.02).r;
    col.g = hsl2rgb(hue + dh,     sat, lum - 0.02).g;
    col.b = hsl2rgb(hue + 2.0*dh, sat, lum + 0.04).b;

    // Two drifting lens-flare hotspots — like light catching the projector lens
    vec2 l1 = vec2(0.30 + 0.12*cos(t*1.6), 0.40 + 0.08*sin(t*1.3));
    vec2 l2 = vec2(0.70 + 0.10*sin(t*1.2), 0.60 + 0.07*cos(t*1.9));
    float flare1 = 0.35 / (1.0 + 70.0 * dot(uv-l1, uv-l1));
    float flare2 = 0.22 / (1.0 + 90.0 * dot(uv-l2, uv-l2));
    float flare  = flare1 + flare2;

    // Warm white bloom at flare centres (colour temperature of a tungsten lamp)
    col += flare * vec3(1.0, 0.93, 0.82) * 0.55;

    // Keep dark — this is a 20-30% opacity layer, not a light source
    col *= 0.52;

    // Vignette — edges stay darker so film posters read against it
    float vig = 1.0 - smoothstep(0.20, 0.95, length(uv - 0.5) * 1.9);
    col *= mix(0.15, 1.0, vig);

    gl_FragColor = vec4(col, 1.0);
  }
`;

// ── Component ─────────────────────────────────────────────────────────────────

interface Props {
  opacity?: number;
  className?: string;
  variant?: "dark" | "rainbow";
}

export default function ShaderAnimation({
  opacity = 0.3,
  className = "",
  variant = "dark",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId: number;
    let cleanup: (() => void) | undefined;

    import("three").then(
      ({ WebGLRenderer, Scene, OrthographicCamera, PlaneGeometry, ShaderMaterial, Mesh, Vector2, Clock }) => {
        const renderer = new WebGLRenderer({ canvas, alpha: false, antialias: false });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

        const scene  = new Scene();
        const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);

        const uniforms = {
          uTime:       { value: 0 },
          uResolution: { value: new Vector2() },
        };

        const material = new ShaderMaterial({
          vertexShader:   vert,
          fragmentShader: variant === "rainbow" ? fragRainbow : fragDark,
          uniforms,
        });
        scene.add(new Mesh(new PlaneGeometry(2, 2), material));

        const resize = () => {
          const w = canvas.offsetWidth;
          const h = canvas.offsetHeight;
          renderer.setSize(w, h, false);
          uniforms.uResolution.value.set(w, h);
        };
        resize();
        window.addEventListener("resize", resize);

        const clock = new Clock();
        const tick  = () => {
          animId = requestAnimationFrame(tick);
          uniforms.uTime.value = clock.getElapsedTime();
          renderer.render(scene, camera);
        };
        tick();

        cleanup = () => {
          cancelAnimationFrame(animId);
          window.removeEventListener("resize", resize);
          renderer.dispose();
          material.dispose();
        };
      }
    );

    return () => cleanup?.();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      style={{ opacity }}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden
    />
  );
}
