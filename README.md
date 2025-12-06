# 技術書管理アプリ (Tech Book Shelf) 📚

React Native (Expo) における「動的なデータ」の扱いをマスターするためのハンズオン課題です。
このプロジェクトを通して、**API 通信**、**フォーム入力（モーダル）**、そして**データの永続化（保存）**の実装方法を学びます。

## 🏁 ゴール

以下の機能を持つ「技術書管理アプリ」を完成させてください。

1.  **おすすめ本リスト**: 外部 API からデータを取得して表示する。
2.  **本の追加**: モーダルフォームから自分の好きな本を追加できる。
3.  **読書記録**: 読んだ本にチェックをつけ、アプリを再起動してもその状態を維持する。

---

## 🛠 セットアップ

### 1. プロジェクトの作成

```bash
npx create-expo-app@latest tech-book-shelf
cd tech-book-shelf
```

### 2. 必要なライブラリのインストール

今回は「データの保存」を行うため、外部ライブラリが必要です。

```bash
npx expo install @react-native-async-storage/async-storage
```

## 📝 課題 (Missions)

### Mission 1: API からデータを取得する (Networking)

まずは、静的なダミーデータではなく、インターネット上の API からデータを取得して表示させましょう。

- `https://jsonplaceholder.typicode.com/posts` からデータを fetch してください。
- データ量が多いので、先頭の 10 件だけ (`slice(0, 10)`) を表示してください。
- データ取得中は、ユーザーが不安にならないように「グルグル（インジケータ）」を表示してください。

💡 **Hint:**

- 副作用フック `useEffect` 内で非同期処理を実行します。
- ローディング状態の管理には `useState(true)` を使い、取得完了後に `false` にします。
- コンポーネント: `<ActivityIndicator />`

### Mission 2: 本を追加するフォームを作る (Input UX)

「＋」ボタンを押して、自分の好きな本をリストに追加できるようにします。

- `<Modal>` を使い、下からスライドして現れる入力画面を作ってください。
- 「タイトル」と「概要」を入力して追加ボタンを押すと、リストの先頭に追加されるようにしてください。
- 【重要】 キーボードが出ても入力欄が隠れないようにし、背景タップでキーボードが閉じるようにしてください。

💡 **Hint:**

- ネイティブアプリの鬼門「キーボード問題」への対策が必要です。
- `<TouchableWithoutFeedback onPress={Keyboard.dismiss}>` で全体を囲む。
- `<KeyboardAvoidingView behavior="...">` で入力欄を囲む。

### Mission 3: 読了状態を保存する (Persistence)

アプリを閉じてもデータが消えないようにします。

- リストの右側に「本アイコン（未読）」を配置し、タップすると「チェックアイコン（読了）」に切り替わるようにしてください（色はグレー ⇔ 緑など）。
- アプリを再起動しても、何が「読了」か忘れないようにしてください。

💡 **Hint:**

- `AsyncStorage` は非同期（Promise）です。
- 全データを保存する必要はありません。「読了した本の ID リスト（配列）」だけを保存・読み込みするのが効率的です。

### Mission 4: ロジックの分離 (Refactoring / Advanced)

`index.tsx` が肥大化しないように、設計を整えましょう。

- API 取得、追加、保存などのロジックを Custom Hook (`useRecommendedBooks`) に切り出してください。
- モーダルの見た目と入力管理を コンポーネント (`AddBookModal`) に切り出してください。

💡 **Hint:**

- View（見た目）と Logic（処理）を分離することで、可読性と保守性が劇的に向上します。
- 親コンポーネントは「データの表示」と「イベントの伝達」だけに集中させましょう。

## 📚 技術ガイド

### 非同期データ取得の基本形 (TypeScript)

```typescript
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch("URL");
      const json = await response.json();
      setData(json);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  fetchData();
}, []);
```

### AsyncStorage の基本操作

Web の `localStorage` と違い、必ず `await` が必要です。

```typescript
// 保存
await AsyncStorage.setItem("key", JSON.stringify(value));

// 読み込み
const value = await AsyncStorage.getItem("key");
if (value !== null) {
  // JSON.parse(value) ...
}
```

## ✅ 完成チェックリスト

- アプリ起動時に「読み込み中...」のグルグルが表示されるか？
- 本の追加時、キーボードで入力欄が隠れてしまわないか？
- 追加ボタンを押した後、フォームの内容はリセットされているか？
- アプリをタスクキルして再起動しても、読了マーク（チェック）は残っているか？

Happy Coding! 🚀
