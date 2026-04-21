# エコール送迎管理アプリ 引き継ぎ資料

最終更新: 2026-04-21

## 🔑 プロジェクト基本情報

- 公開URL: https://fukuzawa1994-code.github.io/dorimyu-kanri/ecole_firebase.html
- GitHub: fukuzawa1994-code/dorimyu-kanri
- tabId: 987398420
- Firebase プロジェクトID: project-4253359140668035575
- Firebase API Key は ecole_firebase.html の先頭に記載
- Gemini API Key は ecole_firebase.html 内に記載
- Geminiモデル: gemini-2.5-flash-lite

※ GitHubトークンは前のチャットで共有済み（新規作成が必要ならGitHub Settings > Developer settingsで発行）

## 📊 実装済み機能（2026/04/18時点 18機能）

1. 下部ナビ6個化（送迎一覧・入力・通知・記録・車両・その他）
2. 車両点検簿（8車種・12項目・承認欄付きPDF）
3. アルコールチェック（本人入力・30名対象）
4. ケース記録PDF（班全員/1人選択）
5. GH→ぱぁとなぁリネーム（紬男子6/紬女子4/ひまわり4）
6. 利用者名表記統一（奏楽名簿ベース）
7. USER_MASTER統合マスター
8. DEFAULT_TRANSPORT（59名の基本送迎）
9. PAATONAA_SCHEDULE（曜日別送迎パターン）
10. STAFF_MASTER（7カテゴリ職員マスター）
11. 給食場所変更モーダル（奏楽/童里夢/たんぽぽ/エコール）
12. 関根清美を給食対象に（月〜金）
13. すたぁと給食UI刷新（レストラン連絡明記）
14. TRANSPORT_STAFFフルネーム化
15. 食事判定ロジック（getMealPlan・複雑条件対応）
16. 給食画面ぱぁとなぁ朝夕食セクション
17. 連絡入力画面改修（利用者所属情報表示）
18. 所属ベース送迎一覧（便ベースと切替可能）

## 🗄️ マスターデータ構造（全てecole_firebase.html内に定義済み）

### USER_MASTER（利用者マスター・59名）
- 童里夢: レストラン10名、雑貨班13名、パン班6名、パン缶11名
- 奏楽: かなで6名、といろ7名、らくらく18名
- ぱぁとなぁ: 紬男子6名、紬女子4名、ひまわり4名

### STAFF_MASTER（職員マスター・7カテゴリ）
- 童里夢（生活介護）21名
- 童里夢（就労B・パン缶）4名
- 奏楽15名
- ぱぁとなぁ（GH）21名
- すたぁと21名
- 送迎（専属）3名: 加藤健吾・國友豊・牧原修一
- 管理者4名

### DEFAULT_TRANSPORT（基本送迎・59名）
全利用者の朝夕便・降車場所を登録済み。

### PAATONAA_SCHEDULE（ぱぁとなぁ曜日別）
- 月: 朝なし、夕 事業所→ぱぁとなぁ
- 火: 朝 自宅→事業所、夕 事業所→ぱぁとなぁ
- 水木金: 朝 徒歩、夕 事業所→ぱぁとなぁ
- 土: 朝なし、夕 事業所→自宅

### MEAL_LOCATIONS（給食場所選択肢）
童里夢・奏楽・たんぽぽ・エコール

## 📋 残タスク（次回以降）

### 中規模
- 職員マスター管理画面UI
- アルコールチェック対象をSTAFF_MASTER連動化

### 大規模
- 食事複雑条件の運用確認（奏楽休み→ぱぁとなぁ夕食あり 等）
- 基本送迎の曜日別対応強化（9名の兼務者）

## ⚠️ 重要な技術メモ

### 壊しやすい箇所
- ACCOUNTS ブロック（役職・アカウント定義）
- 大きな const 定義ブロック（STAFF_KYUSHOKU 等）

### 安全な編集方法
1. 精密な文字列マッチで置換
2. window.doLogin 健在確認
3. サイズ変動が大きすぎないか確認（±500バイト以内目安）
4. ゆるマッチ正規表現は使わない

### 印刷機能
- iframe方式でポップアップブロック回避
- A4横設定
- 月次PDF：Excel風横並び表

## 🔄 新しいチャット引き継ぎ時の呪文

---
エコール送迎管理アプリの続き開発。GitHub: fukuzawa1994-code/dorimyu-kanri
引き継ぎ資料は HANDOVER.md を参照。
tabId: 987398420
最新状態を確認してから続行してください。
---

## 📝 主要コミット履歴（2026/04/18）

- 7b341db2: Step 6 所属ベース送迎一覧（最新）
- 8e03a851: 構文エラー修正
- e81eecdb: Step 5-C USER_MASTER参照
- 43284aca: Step 5-B 利用者所属表示
- 4a5bef9a: Step 5-A 場所セレクト正規化
- f9c256ba: Step 4-2 ぱぁとなぁ朝夕食
- d8ec9570: Step 4-1 食事判定ロジック
- de1664ac: Step 3 ALCOHOL_STAFF整備
- 10e2197e: Step 2 TRANSPORT_STAFFフルネーム
- f0043b13: Step 1 すたぁと給食UI刷新


---

## 🆕 2026-04-18 夜の追記（給食リファクタリング開始）

### 今日追加で完了したコミット
- **4416e93** Step B-1: 給食管理画面の朝食セクション削除（renderKyushoku内のbreakfast関連を完全削除）
- **1a1835b** Step B-2: アルコールチェックで0入力OKに（バリデーション緩和・空は自動0）

### 📋 現在進行中の大タスク「給食管理リファクタリング」

#### 完了
- [x] Step B-1: 朝食セクション削除 (4416e93)
- [x] Step B-2: アルコール0入力OK (1a1835b)

#### 未着手（優先度順）
- [ ] #4 給食場所変更申請の連続実行バグ修正（1件申請後に2件目ができない）
- [ ] #2 休暇申請が白画面になる（画像確認済み、renderVacation周辺要調査）
- [ ] #1 職員給食データを「食べる人だけ」に戻す（STAFF_KYUSHOKUに全員入っている問題）
- [ ] Step B-3: ぱぁとなぁ個別夕食連絡画面を削除（画像1,2の個別カードUI）
- [ ] #5 給食場所変更申請を職員にも対応（現状は利用者のみ）
- [ ] #6 すたぁとタブ廃止（数だけ給食タブへ集約）
- [ ] Step A-1〜5: 欠席画面に食事UI追加（昼食・夕食それぞれに奏楽/童里夢/ぱぁとなぁ/たんぽぽ/エコール/食べない を選択可）

### ⚠️ 今日気づいた既存バグ・問題
1. **職員給食表示で「食べない職員」が全員「給食あり」になっている**（画像4で奏楽15名全員給食あり）
2. **休暇申請画面が白画面**（画像2、申請ボタンが見えない）
3. **給食場所変更申請の連続実行不可**（1件目の後、モーダルが閉じない等）
4. **欠席時の食事選択ができない**（奏楽休みでもぱぁとなぁ夕食あり等のケース対応できない）

### 📝 実装方針（ユーザー指示）
- **「超ゆっくり・丁寧に壊れないように」**
- 1タスク1コミット、github.dev利用、Ctrl+H/Ctrl+Gで精密編集
- 実装前に必ず要件確認（ask_user_input_v0活用）

### 🔧 キー関数の行番号（参考、最新コミット1a1835b時点）
- `window.doAlcoholSubmit`: L1845-（アルコール送信、バリデーション削除済み）
- `function getMealPlan`: L2072-2152
- `function aggregateMeals`: L2155-2175
- `function renderMasterList`: L2179-2342（⑧ALCOHOL_STAFFまで、STAFF_MASTERセクション未実装）
- `function renderAbsence`: L3723-3765（欠席画面、absenceBodyに描画）
- `function renderKyushoku`: L3902-4015（給食画面、朝食関連削除済み）
- `const ACCOUNTS`: L156553付近（62アカウント、パスワードはFirestore管理）
- `const STAFF_MASTER`: L5324付近（7カテゴリ89名）

### 🔑 作業環境の再確認
- **github.dev** で直接編集 → Ctrl+S → ソース管理パネルでコミット＆プッシュ
- Ctrl+G で行番号ジャンプ、Ctrl+H で置換、Ctrl+Shift+K で行削除
- コミット前に `M` マーク（タブ名・左サイドバー）で変更確認


---

## 🆕 2026-04-18（深夜）追加セッション成果

### 今セッションで追加された2コミット
- **aa943c3** HANDOVER.md更新（Step B-1/B-2完了記録）
- **6109074** Step #4: 給食場所変更モーダルの連続実行対応（openMealChangeModal冒頭に既存モーダル削除を1行追加）

### 🚨 次チャットで最優先でやること（必読）

ユーザー（福澤さん）から情報待ち：
1. **奏楽職員15名のうち、本当に給食を食べる職員は誰か**
   - 現在L3783でusers配列に15名全員登録：稲石聖子,岩城道代,岩瀬ユカ,加藤健吾,熊谷由美,後藤知子,高木とも子,田中友香里,内藤雅文,中島博之,橋元賢治,林竜希,堀江修司,眞木祐奈,松下真弓
      - 情報もらったら → この配列から「食べない人」を削除してコミット
      2. **童里夢職員20名で食べない人がいるか**
      3. **休暇申請の仕様**（保存項目の確認）
      4. **ぱぁとなぁ・すたぁとタブを完全削除するか**

      ### 🔴 重大発見：休暇申請白画面の真因
      - `window.doVacationSubmit` 関数 → **完全に消えている（undefined）**
      - `window.setVacType` 関数 → **完全に消えている（undefined）**
      - HTML（L627 `scr-vacation`）にはボタンが存在するが、クリック時の関数が未定義
      - これが「白画面」の原因
      - **再実装が必要**（過去のコミット8e03a85または b5ed13b での緊急修正時に巻き添え削除された可能性高）

      ### 🔧 キー位置情報（最新コミット6109074時点）
      - `window.openMealChangeModal`: L2011-2032（既存モーダル削除コード追加済み）
      - `window.submitMealChange`: L2033-2059（成功時はモーダル削除あり・catch時なし）
      - `function getMealPlan`: L2072-2152
      - `function aggregateMeals`: L2155-2175
      - `function renderAbsence`: L3723-3765
      - `function renderKyushoku`: L3902-4015（朝食関連削除済み）
      - `const STAFF_KYUSHOKU`: **L3773-3785**（童里夢職員20+条件付き2、奏楽職員15）
      - `scr-vacation` (HTML): **L627**（1行1488文字、vac-date/vac-applicant/vac-hours/vac-note, doVacationSubmit/setVacType呼び出しあり）
      - `kyushoku-gh-area` (ぱぁとなぁ個別画面): **L534**（1行425文字、display:none、ぱぁとなぁ夕食連絡）
      - `kyushoku-start-area` (すたぁと画面): **L535〜** 複数行

      ### 📋 残タスク優先順位（次チャット）
      1. 【情報入手後即実装】#1 奏楽職員データ修正（1コミット）
      2. 【情報入手後即実装】#1 童里夢職員データ修正（1コミット）
      3. 【確認後実装】#2 休暇申請 doVacationSubmit/setVacType 再実装（1コミット）
      4. 【確認後実装】B-3 ぱぁとなぁ個別画面削除（L534削除、タブ削除）
      5. 【確認後実装】#6 すたぁとタブ廃止
      6. 【確認後実装】#5 給食場所変更を職員にも
      7. 【大型機能】A-1〜5 欠席画面に食事UI追加

      ### 🎯 次チャットの再開呪文
      ユーザーが「続ける」と言ったら：
      1. tabs_context_mcp でタブ確認（987398420=github.dev, 987398667=raw）
      2. HANDOVER.md を読み返してこのセクションを確認
      3. ユーザーからの4つの情報待ち → 回答あれば即実装
      4. 無ければ情報要求の簡潔な質問

---

## 🆕 2026-04-19 セッション成果（13コミット）

### ✅ HANDOVER 積み残しタスクの消化
- **#1a 童里夢職員給食マスター修正**（937ceec, fab8dbb）：牛山・栗原・梶尾の3名のみ＋関根 火〜金、篠原は通常扱いへ戻す
- **#1b 奏楽職員給食マスター修正**（fab8dbb）：堀江/林/内藤/高木/加藤賢吾（＝相談の加藤）の5名に
- **#2 休暇申請 白画面修正**（1624e0a）：setVacType / doVacationSubmit を復元
- **B-3 ぱぁとなぁ個別画面・タブ削除**（8208647）：給食・すたぁとの2タブ構成へ整理
- **#6 すたぁとタブ廃止**（ba5120f）：給食画面のタブUIから削除（後段 9b2e6e9 で「その他」メニュー経由で呼び出せるように）

### 🐛 04-19 で追加で潰したバグ・改善
- **奏楽利用者が給食一覧に出ない** → d65c179：KYUSHOKU に かなで／といろ／らくらく を追加
- **給食合計ラベルが「童里夢」のみ表示** → cfc750f：「童里夢・奏楽」に修正（合計計算も正しく）
- **給食場所変更後に画面が再描画されない** → 7d70748：renderKyushokuPanel（タイポ）→ renderKyushoku に修正
- **距離画面 送信ボタンで null 参照エラー** → 95d74ec：氏名欄削除に伴い d-staff → currentStaff 参照へ
- **すたぁと給食連絡の導線不在** → 9b2e6e9：「その他」メニューから kyushoku-start-area を呼び出せるように

### 🆕 04-19 新機能
- **日月法人休日対応**（61b2b55 + 597eee3）：getMealPlan で日曜月曜は早期 return、renderKyushoku で「本日は法人休日」メッセージ＋集計 0
- **ぱぁとなぁ夕食 3分割＋色分け**（901567f）：
  - 紬男子 = 青（#0288D1）
  - 紬女子 = ピンク（#E91E63）
  - ひまわり = 黄（#FBC02D）

### 📝 マスターデータ修正
- **伊藤憲 → 伊藤憲孝**（b8dff18）：USER_MASTER・SOGAKU_MASTER・KYUSHOKU の 5 箇所を一括修正
- **パン缶から福井亮右 削除**（b8dff18）：基本休み扱い、不定期利用のため

## 📋 現時点の残タスク（2026-04-20 時点・優先度順）

### 🔴 優先（機能バグ・未実装）
- **ぱぁとなぁ 出欠UI 追加**：ホーム戻り・夕食あり／なし・帰省 を選択できるUI
- **すたぁと給食を給食画面に埋め込み**：現状は「その他」メニューから別画面。給食画面に統合

### 🟡 中規模
- **購入申請 月カレンダー表示**：大改修本体は 2026-04-20 に完了（下記セクション参照）。残るのは月別カレンダーでの申請可視化のみ
- **職員マスター管理画面 UI**：現状は renderMasterList が閲覧専用
- **アルコールチェック対象を STAFF_MASTER 連動化**：現状 ALCOHOL_STAFF は手動リスト

### 🟢 大規模
- **食事複雑条件の運用確認**：奏楽休み → ぱぁとなぁ夕食あり 等のケース。**A-1〜5 で欠席ログに mealLunch/mealDinner の明示指定が保存可能になり getMealPlan / aggregateMeals / renderAbsence には反映されるが、給食画面 `renderKyushoku` は独自ロジックのため override 非反映（要運用確認→必要なら別タスクで renderKyushoku を getMealPlan 経由に統合）**
- **基本送迎の曜日別対応強化**：兼務者 9 名（候補は 2598674 で登録済み、運用未検証）
- **大量データ対策**：logs 取得を直近 30 日に限定（現状は全件 onSnapshot、将来的にパフォーマンス懸念）

---

## 🆕 2026-04-20 セッション成果（購入申請大改修・4コミット）

### ✅ 購入申請 大改修 完了

HANDOVER「中規模」に積まれていた **購入申請 大改修** の本体を完了。ひとつの大きな変更を 4 コミットに分割し、各コミット前に差分確認を取る方式で段階的に実装。

- **d6bb770** #1/3: HTMLフォーム改修（最大5品目化・税/用途分離・合計表示）
- **e1c7820** #2/3: 品目追加/削除・自動計算・フォームリセット機能
- **b11a8bf** #3/3: submitPurchase1/2 とリスト/step2 を新形式へ対応（後方互換あり）
- **6d23e95** #4: 用途を複数選択可能に変更

### 🎯 改修内容

1. **品目 最大5つ**：＋品目追加 / 🗑 削除ボタン、先頭行を cloneNode で複製（`#p-add-item-btn` / `renumberPurchaseItems`）
2. **6項目**：品名 / 数量 / 単価 / 税(8%|10%) / 用途 / 購入目的（任意・品目ごと）
3. **用途は複数選択可**（`#4` で変更）：事業費・事務費・製造・販売・仕入・消耗・器具（データ形式 `usage: string[]`）
4. **自動計算**：`#p-items-wrap` の input イベント委譲で `recalcPurchaseTotal` 発火、税抜/税込合計をリアルタイム表示
5. **バリデーション**：行ごとに具体的なエラートースト（「品目Xの税を選んでください」等）
6. **送信成功後リセットバグ修正**：`resetPurchaseForm()` を成功時に呼ぶ
7. **承認画面（step2）刷新**：打診時の内容を表で表示、実際の単価のみ編集可、数量/税/用途はロック表示
8. **後方互換**：旧 `items:[{name,price,tax}]` データも list/step2 両方で従来通り表示（`p.itemsV2` フラグで分岐）
9. **onclick の JSON 埋め込み撤去**：`submitPurchase2` の引数を `(id, origItems)` → `(id)` に変更、Firestore 再取得方式に

### 🔧 Firestore データ形式（purchases コレクション）

**新形式（`itemsV2: true`）**:
```
items: [{ name, qty, unitPrice, tax: '8%'|'10%', usage: string[], purpose }]
subtotal         // 税抜合計
totalPrice       // 税込合計
// 本申請後:
items2: [{..., actualUnitPrice, actualLineSub, actualLineTotal }]
subtotalActual
totalActual
```

**旧形式**（そのまま残り、読み取りは従来通り動作）:
```
items: [{ name, price, tax }]
totalPrice       // 単純合計
purpose          // 全体目的
// 本申請後:
items2: [{..., actualPrice }]
totalActual
```

### 🔑 主要関数の行番号（最新コミット 6d23e95 時点）

- `window.togglePTax` / `window.togglePUsage`: L3351- / L3359-（用途は単独トグル化済）
- `window.addPurchaseItem` / `window.removePurchaseItem`: L3363- / L3380-
- `function renumberPurchaseItems` / `recalcPurchaseTotal` / `resetPurchaseForm` / `initPurchaseFormListeners`: L3390- / L3415- / L3436- / L3455-
- `window.submitPurchase1`: L3460-
- `function renderPurchaseItemsSummary`: L3525-
- `window.renderPurchaseList`: L3560-
- `window.startStep2`: L3605-
- `window.submitPurchase2`: L3661-（引数変更 `(id)`）
- HTML `#p-items-wrap`: L585-、`#p-add-item-btn` / `#p-total-area`: L609- / L611-

### ⚠️ 作業中の気づき

- `submitPurchase2` の旧実装は `onclick="...,JSON.stringify(items)..."` で HTML 属性内 JSON の `"` がクォート破損を起こす潜在バグあり（旧仕様では稀にしか踏まれなかった）。`(id)` 単独渡しに変更して解消。
- `.replace(/'/g,"\'")` のような no-op 置換コードが旧 step2html に残っていた（本コミットで撤去）。
- commit 1 / 2 単独状態では `submitPurchase1` が旧形式のまま（`#p-purpose` / `.p-item-price` 参照）なので申請ボタンは壊れる。1〜3 は必ずセットで push する必要あり（今回は 1〜4 まとめて push）。

### 📋 残タスク（2026-04-20 時点）

- 🔴 ぱぁとなぁ 出欠UI 追加
- 🟡 購入申請 **月カレンダー表示**（大改修本体の残件）
- 🟡 職員マスター管理画面 UI
- 🟡 アルコールチェック対象を STAFF_MASTER 連動化
- 🟢 食事複雑条件の運用確認（renderKyushoku を getMealPlan 経由に統合するか要判断）/ 基本送迎の曜日別強化 / 大量データ対策

---

## 🆕 2026-04-20 追加セッション成果（欠席画面 食事UI・5コミット）

### ✅ A-1〜5 欠席画面に食事UI追加 完了

「昼食・夕食それぞれに場所を明示指定できる」大型タスクを 5 コミットに分割して実装。

- **70d84f1** A-1/5: `scr-form` に 昼食/夕食 7択セクションを追加（display:none）
- **8829c5c** A-2/5: fState / togSet / resetTogs を mealLunch・mealDinner 対応
- **c91ce7a** A-3/5: セクション表示切替（abs≠出席 で切替）と Firestore 保存対応（案B: '自動' は保存しない）
- **9ac0994** A-4/5: `getMealPlan` に absLog.mealLunch / mealDinner override を追加（後方互換あり）
- **26ede29** A-5/5: `renderAbsence` に 昼→◯◯ 夕→◯◯ の表示を追加

### 🎯 仕様

- **UI**: 入力画面 `scr-form` で `abs !== '出席'` のとき、従来の「給食あり/なし」セクションを隠し、「昼食」「夕食」それぞれに 7 択トグルを表示
- **7択**: 自動 / 童里夢 / 奏楽 / ぱぁとなぁ / たんぽぽ / エコール / 食べない
- **デフォルト**: 「自動」（= getMealPlan の既存ロジックで判定）
- **保存**: `fState.mealLunch/mealDinner` が `'自動'` 以外のときのみ Firestore の log に `mealLunch` / `mealDinner` フィールドとして保存（案B）
- **判定の優先順位**: `absLog` の明示指定 > `meal_change` 申請 > primary 事業所による自動

### 🔧 新しい Firestore ログ形式

欠席・遅刻・早退のログに以下が追加される可能性あり（指定時のみ）:
```
mealLunch?: '童里夢' | '奏楽' | 'ぱぁとなぁ' | 'たんぽぽ' | 'エコール' | '食べない'
mealDinner?: 同上
```
未指定なら従来と同じ（自動判定 fall back）。旧ログは自動扱いで完全後方互換。

### 📊 反映箇所と対象外

| 対象 | 反映 |
|---|---|
| `getMealPlan` | ✅ override 反映 |
| `aggregateMeals`（給食画面の集計数） | ✅ getMealPlan 経由で反映 |
| `renderAbsence`（欠席一覧） | ✅ カード行に「昼→◯◯ 夕→◯◯」を表示 |
| `renderKyushoku`（給食画面の明細） | ❌ 独自ロジックで `logs.find(...)` を直接参照しているため非反映 |

→ renderKyushoku の統合は 🟢 大規模「食事複雑条件の運用確認」に内包し、運用で問題出たら別タスクで対応。

### 🔑 主要キー位置（最新コミット 26ede29 時点）

- HTML `#f-meal-abs-sec`（scr-form 内、display:none 初期）: L265-
- `let fState = { ..., mealLunch:'自動', mealDinner:'自動' }`: L732
- `function resetTogs`（mealLunch/mealDinner 対応）: L1110
- `window.togSet`（sonVals/sabVals の配列 include 判定）: L1119
- `function updateFormBlocks`（abs≠出席 でセクション切替）: L1139
- `function doSubmit`（'自動' 以外のみ entry に保存）: L2609-2613
- `window.getMealPlan`（absLog.mealLunch/mealDinner を最優先で反映）: L2105-
- `function renderAbsence`（mealParts 表示）: L3993-

### ✅ 2026-04-20 追加で閉じたタスク

- **#5 給食場所変更を職員にも対応**: 実装は既に `1a9131c`（2026-04-18）で完了していたことを確認。
  ついでに `meal_change` 検索 4 箇所に `isStaff` フィルタを追加し、利用者↔職員の同名衝突を防止。

---

## 🆕 2026-04-20 追加セッション成果（すたぁと給食連絡 改修・3コミット）

### ✅ すたぁと給食連絡の独立化 + 月カレンダー一括入力 完了

HANDOVER「🔴 すたぁと給食を給食画面に埋め込み」相当の再構成を 3 コミットで実装。
意図は「給食画面に埋め込み」ではなく「独立 scr に分離して月カレンダーで一括入力できるようにする」方向で合意。

- **32c5c12** #1/3: 独立した `scr-startkyushoku` に分離（給食管理画面との重複解消）
- **26d89b8** #2/3: 月カレンダー一括入力 UI を追加（履歴セクションを統合）
- **c8b1cdd** #3/3: 月カレンダー JS 実装（変更があった日だけ保存＝案B 安全運用）

### 🎯 改修内容

1. **画面分離**: メニュー「その他 → すたぁと給食連絡」を `goScr('startkyushoku')` に変更。
   従来は `scr-kyushoku` 上に `kyushoku-start-area` を display:block するだけだったため、
   奏楽/童里夢/ぱぁとなぁ/すたぁと全一覧と重複表示されていた問題を解消。
2. **月カレンダー縦リスト**: 対象月の 1 日〜末日を縦リストで表示（日曜・月曜は法人休日でスキップ）。
   各行: `MM/DD(曜) | 利 [  ] | 職 [  ] | 翌 [  ] | 備考 [      ]`。
3. **既存データのプリフィル**: `logs` から `type==='start_kyushoku'` かつ対象月内のログを抽出して各行に反映。
   初期値は `data-init-*` 属性に保持し、入力変更時に比較して `data-dirty='1/0'` を切替。
4. **変更があった日だけ保存（Q4=B 安全運用）**: `doStartBulkSave()` で dirty 行のみ処理。
   全ゼロ＆備考空なら既存ドキュメント削除のみ（クリア動作）、そうでなければ upsert。
5. **誤操作防止の confirm**: 月切替時に dirty があれば警告、保存時にも件数確認ダイアログ。
6. **単日入力フォーム併存（Q1=B）**: 既存の `doStartSubmit` / 単日フォームはそのまま残置（素早い 1 日入力用）。
7. **履歴セクションは月カレンダーに統合（Q5=B）**: `start-history-body` は削除。
   `renderStartHistory` 関数は body null 早期 return で副作用なく残置。

### 🔧 Firestore データ形式（変更なし・完全後方互換）

```
type: 'start_kyushoku'
date: 'YYYY-MM-DD'
users: number, staff: number, nextLunch: number, memo: string
recordedBy, ts, createdAt
```
1日1ドキュメント。保存時は同日既存を deleteDoc してから新規 addDoc（単日フォーム・月カレンダーとも）。

### 🔑 主要キー位置（最新コミット c8b1cdd 時点）

- HTML `scr-startkyushoku`（単日フォーム + 月カレンダー）: L545-
- `goScr('startkyushoku')` フック（start-date 初期化・renderStartMonth 呼出）: L910-
- `window.doStartSubmit`（単日保存、既存）: L2405-
- `window.renderStartHistory`（死に残し、早期 return）: L2440-
- `window.startMonthMove` / `window.renderStartMonth`: L2478- / L2493-
- `window.onStartDayInput` / `function updateStartDirtyCount`: L2538- / L2554-
- `window.doStartBulkSave`: L2560-

### ⚠️ 既知の死にコード（今回スコープ外）

- `setKyushokuTab` 内で `ktab-gh` / `kyushoku-gh-area` / `ktab-start` / `kyushoku-start-area` を参照する行がある（要素はすでに存在しない）。呼出元は L534 の ktab-main `onclick="setKyushokuTab('main')"` のみで、クリックすると null 参照で throw する。
- 今回の改修ではこのパスに触れていない（ktab-main を押しても元々壊れていた）。気が向いたら別タスクで .phase-tabs ごと削除するのが良い。


---

## 🆕 2026-04-21 セッション成果（送迎マスター v3 移行 + 表記修正）

### 本日完了コミット（新→古）

- **563d0d2** `#32d-2` renderList を v3 対応（当日運行者抽出 / 担当者表示 / 特記事項 / memo 注記）
- **2e008b1** `#32d-1` 送迎マスター v3 対応（構造保存 + バナー表示、renderList / MasterList は -2/-3 で実装）
- **ca35a05** `#32c` 渡邊一正の表記を「辺」→「邊」に戻す（ac19c2c の一部撤回）
- **946509b** `#32b` renderMasterList を CURRENT_MASTER 優先に改修（6便表示 / 曜日条件併記 / 送迎対象外セクション）
- **c728a2b** `#32a-3` 基本送迎マスター適用ロジック実装（detail 優先 / ぱぁとなぁ居住セクション / noTransport 分類）
- **ac19c2c** 利用者名表記揺れ 7 件を統一（USER_MASTER / MASTER / SOGAKU_MASTER / KYUSHOKU / GH_MASTER / DEFAULT_TRANSPORT、全 36 箇所）

### 🎯 送迎マスター v3 への移行完了

#### 構造
`master_current/current` Firestore ドキュメントに `{version, routes, noTransport, _meta}` 形式で保存。

- **v3 の routes**: `{ '賀茂': {bus, specialNote, morning:{drivers:{曜:担当者}, users:[{name, memo, days:{曜:{ride,from,to}}}]}, evening:{...}}, ... }`
- **v3 の noTransport**: `{ 'パン缶(自力通所)': [...], 'ぱぁとなぁ居住(自力/家族送迎)': [...], 'その他(現時点送迎なし)': [...] }`
- **利用者ユニーク数**: v2 の 51 → v3 の調整後（渡辺真実鼓・稲垣雅子を noTransport から外し、二川 / 東脇便に組み入れ）

#### リーダー対応状況
- `renderList`（送迎一覧）: v3 本実装済（#32d-2）。当日曜日で `ride:true` な利用者のみ抽出、便ヘッダーに当日担当、特記事項は赤字、memo はオレンジ小注記。`latestFor` / `logs` 統合で欠席・利用しないタグを表示。
- `renderMasterList`（マスター一覧）: v3 は**バナーのみ**（#32d-3 で詳細描画を実装予定）。現バナー文言：「詳細表示は送迎一覧で確認可能。マスター一覧画面は #32d-3 対応予定」。

#### 互換性
- v2 import も `normalizeImportedMaster` 経由で `version:'v2'` として保存可能（回帰テスト容易化）
- 既存 v2 リーダー経路は無改修
- `saveBackup` は `payload.data.masterCurrent` に正規化形を保存（復元互換）

### 🔐 Firestore ルール追加（Firebase Console 手動）

`master_current` / `backups` コレクションに以下を追加（既存ルールの末尾に追記）：
```
match /master_current/{id} { allow read, write: if true; }
match /backups/{id}        { allow read, write: if true; }
```
**注**: アプリは Firebase Auth 非使用、`currentUser.role >= 3` をクライアント側チェック。rules 自体は全開放。将来 Auth 導入する際は全コレクション再設計が必要。

### ⚠️ Netlify 利用制限発覚 → ローカル運用継続

- **従来案内**: `https://graceful-churros-cbdf0f.netlify.app`（push で自動反映）
- **現状**: 福澤環境で Netlify 利用制限のため**アクセス不可**
- **代替運用**: GitHub raw から `ecole_firebase.html` を DL → ローカル上書き → `file:///C:/Users/driza/OneDrive/デスクトップ/dorimyu-kanri/ecole_firebase.html` で起動
  - raw URL: `https://raw.githubusercontent.com/fukuzawa1994-code/dorimyu-kanri/main/ecole_firebase.html`
- **CLAUDE.md の GitHub Pages URL**: これも現実態と乖離（GitHub Pages も未設定）
- **将来**: raw 自動更新スクリプト / Service Worker / VS Code 拡張等で簡略化検討 → 別タスク（`#運用`）で計画

### 🧩 新規関数・エクスポート（#32d-1 / #32d-2）

- `window.normalizeImportedMaster(data)` — v2/v3 入力を `{version, routes, noTransport, _meta}` に正規化（未知形式は throw）
- `detectMasterVersion(data)` — 内部ヘルパ、`v2`/`v3`/`null` を返す
- `window.validateImportedMaster` — v2/v3 両対応に拡張
- `window.applyImportedMaster` — normalize 経由で setDoc
- `window.restoreFromBackup` — v3 でも既存コードでそのまま動作（#32a-3 で実装済）

### 🔑 主要関数の行番号（2026-04-21 最新 commit 563d0d2 時点）

- `function renderList`: L1506-（v3 分岐 L1508-1610、v2/fallback L1611-）
- `window.renderMasterList`: L3195-（v3 バナー L3201-3204、v2 以降本体）
- `window.applyImportedMaster`: L2242-
- `window.restoreFromBackup`: L2262-
- `window.normalizeImportedMaster`: L2006-（#32d-1）
- `window.saveBackup`: L1889-（v3 対応済、masterCurrent を payload に含める）
- onSnapshot(master_current/current): L5778-

### 📋 次回タスク優先順位

1. **#32d-2 残検証**（明日、福澤 実機）:
   - 月曜の全便「本日運行なし」表示確認
   - 渕名健太の特記事項（赤字）＋ memo オレンジ注記表示確認
   - マスター一覧画面の新バナー文言確認（「送迎一覧で確認可能」）
   - 担当者バッジ（便ヘッダー右、グレー小文字）確認
2. **#32d-3**: `renderMasterList` を v3 対応（担当者欄 / 特記事項 / 曜日別詳細 / noTransport カテゴリ / バージョンバッジ）
3. **#35**: （TBD — 次回セッションで定義）
4. **#36**: （TBD — 次回セッションで定義）

### 🧪 F12 コンソール動作確認（v3 反映済み確認用）

```js
// 基本確認
const cm = window.CURRENT_MASTER;
console.log({ version: cm && cm.version, routeKeys: cm && cm.routes ? Object.keys(cm.routes) : null, ntKeys: cm && cm.noTransport ? Object.keys(cm.noTransport) : null });
// 期待値: { version:"v3", routeKeys:["賀茂","東脇","二川","草間","曙","マイクロ"], ntKeys:["パン缶(自力通所)", "ぱぁとなぁ居住(自力/家族送迎)", "その他(現時点送迎なし)"] }

// 当日曜日の全便運行サマリ
(()=>{const cm=window.CURRENT_MASTER;if(!cm||cm.version!=='v3')return'v3未反映';const dow=['日','月','火','水','木','金','土'][new Date().getDay()];const r={};for(const b of Object.keys(cm.routes)){const m=cm.routes[b].morning,e=cm.routes[b].evening;r[b]={朝:{担当:m&&m.drivers&&m.drivers[dow]||'-',乗車:(m&&m.users||[]).filter(u=>u.days&&u.days[dow]&&u.days[dow].ride).map(u=>u.name+' '+(u.days[dow].from||'')+'→'+(u.days[dow].to||''))},夕:{担当:e&&e.drivers&&e.drivers[dow]||'-',乗車:(e&&e.users||[]).filter(u=>u.days&&u.days[dow]&&u.days[dow].ride).map(u=>u.name+' '+(u.days[dow].from||'')+'→'+(u.days[dow].to||''))}};}return r;})()
```

### 🗂️ tools/ ディレクトリの現状

- `tools/dump-routes.ps1` — v2 JSON の便別ダンプ（v3 非対応）
- `tools/gen-master-v2.ps1` — 手書き v2 生成スクリプト
- `tools/基本送迎マスター_v2.json` — #32d-1 以前の import 用（履歴保持）
- `tools/送迎マスター_v3.json` — 福澤が Claude.ai 側でパース・配置した v3 JSON（現行 import 対象）

### 💡 編集ルール（変更なし、再掲）

- 「超ゆっくり・丁寧に壊れないように」
- 精密な文字列マッチで Edit、ゆるマッチ正規表現は使わない
- `window.doLogin` / `window.applyImportedMaster` / `window.restoreFromBackup` / `window.normalizeImportedMaster` 健在確認
- 日本語コミットメッセージ、1タスク=1コミット

