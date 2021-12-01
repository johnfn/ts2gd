
declare type AssetType = {
  'res://Main.tscn': PackedScene<Node2D>,
  'res://icon.png': StreamTexture
}

declare type SceneName =
  | 'res://Main.tscn'

declare type AssetPath = keyof AssetType;
  