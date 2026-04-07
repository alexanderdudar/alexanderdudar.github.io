"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function ShaderAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    camera: THREE.Camera;
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    uniforms: Record<string, { value: unknown }>;
    animationId: number;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    // Exact original 21st.dev shader
    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform float scale;
      uniform float xOffset;

      mat2 rotate2d(float angle) {
        return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
      }

      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time * 0.1;

        // Shift animation center to the left half, down 1/3
        uv += vec2(resolution.x / min(resolution.x, resolution.y) * xOffset, resolution.y / min(resolution.x, resolution.y) * 0.05);

        uv /= scale;

        uv += vec2(sin(uv.y * 4.0 + t * 2.0), cos(uv.x * 4.0 + t * 2.0)) * 0.1;
        uv = rotate2d(t * 0.25) * uv;

        float intensity = 0.0;
        float lineWidth = 0.02;

        for (int i = 0; i < 7; i++) {
          float i_float = float(i);
          float wave = sin(t * 2.0 + i_float * 0.5) * 0.5 + 0.5;
          intensity += lineWidth / abs(wave - length(uv) + sin(uv.x + uv.y) * 0.1);
        }

        vec3 color1 = vec3(0.0, 0.5, 1.0);
        vec3 color2 = vec3(1.0, 0.2, 0.5);

        vec3 baseColor = mix(color1, color2, sin(length(uv) * 2.0 - t) * 0.5 + 0.5);
        vec3 finalColor = baseColor * intensity;

        finalColor += (random(uv + t) - 0.5) * 0.08;

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const camera = new THREE.Camera();
    camera.position.z = 1;
    const scene = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry(2, 2);

    const uniforms = {
      time: { value: Math.random() * 1000 },
      resolution: { value: new THREE.Vector2() },
      scale: { value: window.innerWidth < 768 ? 3.0 : 2.0 },
      xOffset: { value: window.innerWidth < 768 ? 0.15 : 0.35 },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const onWindowResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      (uniforms.resolution.value as THREE.Vector2).x = renderer.domElement.width;
      (uniforms.resolution.value as THREE.Vector2).y = renderer.domElement.height;
      (uniforms.scale as { value: number }).value = window.innerWidth < 768 ? 3.0 : 2.0;
      (uniforms.xOffset as { value: number }).value = window.innerWidth < 768 ? 0.15 : 0.35;
    };

    onWindowResize();
    window.addEventListener("resize", onWindowResize, false);

    let lastTime = performance.now();
    const animate = () => {
      const animationId = requestAnimationFrame(animate);
      const now = performance.now();
      const delta = (now - lastTime) / 1000; // seconds
      lastTime = now;
      uniforms.time.value = (uniforms.time.value as number) + delta * 0.5;
      renderer.render(scene, camera);
      if (sceneRef.current) {
        sceneRef.current.animationId = animationId;
      }
    };

    sceneRef.current = { camera, scene, renderer, uniforms, animationId: 0 };
    animate();

    return () => {
      window.removeEventListener("resize", onWindowResize);
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        if (container && sceneRef.current.renderer.domElement) {
          container.removeChild(sceneRef.current.renderer.domElement);
        }
        sceneRef.current.renderer.dispose();
        geometry.dispose();
        material.dispose();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{ background: "#000", overflow: "hidden" }}
    />
  );
}
