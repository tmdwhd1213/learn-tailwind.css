import { randomBytes } from "crypto";

export function generateRandomInt4() {
  const buffer = randomBytes(4);
  const randomNumber = buffer.readUInt32BE(0); // 2바이트를 부호 없는 정수로 변환
  return randomNumber;
}
