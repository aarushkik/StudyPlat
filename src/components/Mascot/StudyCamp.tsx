import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Ellipse, G, Path } from 'react-native-svg';
import { palette } from '@/theme';
import { Mascot } from './Mascot';

/** Original static campsite illustration, drawn around the existing Stu sprite. */
export function StudyCamp({ size = 320 }: { size?: number }) {
  return (
    <View style={{ width: size, height: size * 0.88 }} pointerEvents="none" accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <Svg width="100%" height="100%" viewBox="0 0 360 317">
        <Circle cx="180" cy="144" r="129" fill="#143D49" />
        <Circle cx="180" cy="144" r="143" fill="none" stroke="#27505B" strokeWidth="1" strokeDasharray="3 9" />
        <Circle cx="269" cy="68" r="24" fill="#FFE7AC" />
        <Circle cx="280" cy="59" r="23" fill="#143D49" />
        <Path d="M48 206 96 124 157 207 212 141 304 214Z" fill="#215462" />
        <Path d="m79 151 17-27 23 31-23-9Z" fill="#4C7D87" />
        <Path d="M36 237Q82 193 143 222T325 228L321 266H36Z" fill="#377668" />
        <Ellipse cx="180" cy="269" rx="149" ry="27" fill="#071B23" opacity="0.5" />
        <Path d="M31 239Q47 214 108 226Q159 207 222 221Q292 208 329 239L315 260Q229 292 47 262Z" fill="#7CBA98" stroke={palette.ink} strokeWidth="3" />
        <Path d="M34 245Q124 279 328 242L315 260Q229 292 47 262Z" fill="#427C68" />
        <Path d="M95 262Q145 248 210 253T305 246" fill="none" stroke="#D8D6AD" strokeWidth="14" strokeLinecap="round" />
        <Path d="m54 221 22-48 21 48H86l15 22H50l14-22Z" fill="#123E40" stroke={palette.ink} strokeWidth="2.5" strokeLinejoin="round" />
        <Path d="M75 223v26" stroke={palette.ink} strokeWidth="5" strokeLinecap="round" />
        <Path d="m285 199 15-32 14 32h-8l10 17h-34l10-17Z" fill="#25816E" stroke={palette.ink} strokeWidth="2.5" />
        <Path d="M299 208v22" stroke={palette.ink} strokeWidth="4" strokeLinecap="round" />
        <G transform="translate(245 211) rotate(8)">
          <Path d="M0 22 27-38 58 22Z" fill="#F5A02B" stroke={palette.ink} strokeWidth="3" strokeLinejoin="round" />
          <Path d="m27-38 7 60H58Z" fill="#D2802B" stroke={palette.ink} strokeWidth="2" />
          <Path d="m27-20-14 42h23Z" fill={palette.ink} />
          <Path d="M-5 24h68" stroke={palette.ink} strokeWidth="3" strokeLinecap="round" />
        </G>
        <G fill="#B0C9BA"><Ellipse cx="54" cy="264" rx="9" ry="4" /><Ellipse cx="290" cy="269" rx="7" ry="3" /></G>
        <G fill="#FFD77C"><Circle cx="119" cy="53" r="2.3" /><Circle cx="216" cy="32" r="2" /><Circle cx="318" cy="126" r="2.5" /><Circle cx="40" cy="118" r="2" /></G>
      </Svg>
      <View style={{ position: 'absolute', left: size * 0.24, top: size * 0.10 }}>
        <Mascot size={size * 0.58} pose="wave" shadow={false} />
      </View>
      {[{ x: 0.14, y: 0.24, s: 23 }, { x: 0.79, y: 0.36, s: 17 }].map((star, index) => (
        <View key={index} style={{ position: 'absolute', left: size * star.x, top: size * star.y }}>
          <Svg width={star.s} height={star.s} viewBox="0 0 24 24"><Path d="m12 1 3 7 8 4-8 3-3 8-4-8-7-3 7-4Z" fill="#FFE8AD" stroke="#C28F38" strokeWidth="1.5" strokeLinejoin="round" /></Svg>
        </View>
      ))}
      {[{ x: 0.23, y: 0.65 }, { x: 0.68, y: 0.61 }, { x: 0.84, y: 0.53 }].map((fly, i) => (
        <View key={i} style={[styles.firefly, { left: size * fly.x, top: size * fly.y,
          opacity: 0.6,
        }]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  firefly: { position: 'absolute', width: 5, height: 5, borderRadius: 3, backgroundColor: '#FFE7AC', borderWidth: 1, borderColor: '#FFF7DE' },
});
