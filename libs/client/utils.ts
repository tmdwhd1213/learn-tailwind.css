export function cls(...classNames: string[]) {
  return classNames.join(" ");
}

export function splitWord(word: string) {
  return word?.split(" ")[0];
}

export function getTimeDifferenceString(targetTime: Date): string {
  const currentTime: Date = new Date(); // 현재 시간
  targetTime = new Date(targetTime);
  const timeDiff: number = currentTime.getTime() - targetTime.getTime(); // 현재 시간과 대상 시간과의 차이 (밀리초)

  const msPerMinute: number = 60 * 1000; // 1분에 해당하는 밀리초
  const msPerHour: number = msPerMinute * 60; // 1시간에 해당하는 밀리초
  const msPerDay: number = msPerHour * 24; // 1일에 해당하는 밀리초

  if (timeDiff < msPerDay) {
    // 1일 이내
    const hours: number = Math.floor(timeDiff / msPerHour); // 시간 차이
    if (hours === 0) {
      const minutes: number = Math.floor(timeDiff / msPerMinute); // 분 차이
      return `${minutes}분 전`;
    } else {
      return `${hours}시간 전`;
    }
  } else {
    // 1일 이상
    const koreanTimeString: string = targetTime.toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul",
      hour12: true,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
    return koreanTimeString;
  }
}
