using System;
using System.Collections;
using System.Diagnostics;
using DG.Tweening;
using Frictionless;
using Lumberjack.Accounts;
using Solana.Unity.SDK;
using Services;
using TMPro;
using UnityEngine;
using UnityEngine.UI;
using Debug = UnityEngine.Debug;

/// <summary>
/// This is the screen which handles the interaction with the anchor program.
/// It checks if there is a game account already and has a button to call a function in the program.
/// </summary>
public class GameScreen : MonoBehaviour
{
    public Button ChuckWoodSessionButton;
    public Button NftsButton;
    public Button InitGameDataButton;

    public TextMeshProUGUI EnergyAmountText;
    public TextMeshProUGUI WoodAmountText;
    public TextMeshProUGUI NextEnergyInText;
    public TextMeshProUGUI TotalLogAvailableText;

    public GameObject NotInitializedRoot;
    public GameObject InitializedRoot;
    public GameObject ActionFx;
    public GameObject ActionFxPosition;
    public GameObject Tree;
    
    private Vector3 CharacterStartPosition;
    private PlayerData currentPlayerData;
    private Stopwatch stopwatch = new Stopwatch();
    
    void Start()
    {
        ChuckWoodSessionButton.onClick.AddListener(OnChuckWoodSessionButtonClicked);
        NftsButton.onClick.AddListener(OnNftsButtonClicked);
        InitGameDataButton.onClick.AddListener(OnInitGameDataButtonClicked);
        CharacterStartPosition = ChuckWoodSessionButton.transform.localPosition;
        
        StartCoroutine(UpdateNextEnergy());
        
        AnchorService.OnPlayerDataChanged += OnPlayerDataChanged;
        AnchorService.OnGameDataChanged += OnGameDataChanged;
        AnchorService.OnInitialDataLoaded += UpdateContent;
    }

    private void OnDestroy()
    {
        AnchorService.OnPlayerDataChanged -= OnPlayerDataChanged;
        AnchorService.OnGameDataChanged -= OnGameDataChanged;
        AnchorService.OnInitialDataLoaded -= UpdateContent;
    }

    private void OnEnable()
    {
        StartCoroutine(UpdateNextEnergy());
    }

    private async void OnInitGameDataButtonClicked()
    {
        await AnchorService.Instance.InitAccounts(!Web3.Rpc.NodeAddress.AbsoluteUri.Contains("localhost"));
    }

    private void OnNftsButtonClicked()
    {
        ServiceFactory.Resolve<UiService>().OpenPopup(UiService.ScreenType.NftListPopup, new NftListPopupUiData(false, Web3.Wallet));
    }

    private IEnumerator UpdateNextEnergy()
    {
        while (true)
        {
            yield return new WaitForSeconds(1);
            UpdateContent();
        }
    }

    private void OnPlayerDataChanged(PlayerData playerData)
    {
        if (currentPlayerData != null && currentPlayerData.Wood < playerData.Wood)
        {
            stopwatch.Stop();
            Debug.Log($"Last Transaction took: " + stopwatch.Elapsed.Milliseconds + "ms");
            ChuckWoodSessionButton.transform.DOLocalMove(CharacterStartPosition, 0.2f);
            Tree.transform.DOKill();
            Tree.transform.localScale = Vector3.one;
            Tree.transform.DOPunchScale(Vector3.one * 0.1f, 0.1f);
            Instantiate(ActionFx, ActionFxPosition.transform.position, Quaternion.identity);
        }

        currentPlayerData = playerData;
        UpdateContent();
    }

    private void OnGameDataChanged(GameData gameData)
    {
        var totalLogAvailable = AnchorService.MAX_WOOD_PER_TREE - gameData.TotalWoodCollected;
        TotalLogAvailableText.text = totalLogAvailable + " Wood available.";
    }

    private void UpdateContent()
    {
        var isInitialized = AnchorService.Instance.IsInitialized();
        NotInitializedRoot.SetActive(!isInitialized);
        InitGameDataButton.gameObject.SetActive(!isInitialized && AnchorService.Instance.CurrentPlayerData == null);
        InitializedRoot.SetActive(isInitialized);

        if (AnchorService.Instance.CurrentPlayerData == null)
        {
            return;
        }
        
        var lastLoginTime = AnchorService.Instance.CurrentPlayerData.LastLogin;
        var timePassed = DateTimeOffset.UtcNow.ToUnixTimeSeconds() - lastLoginTime;
        
        while (
            timePassed >= AnchorService.TIME_TO_REFILL_ENERGY &&
            AnchorService.Instance.CurrentPlayerData.Energy < AnchorService.MAX_ENERGY
        ) {
            AnchorService.Instance.CurrentPlayerData.Energy += 1;
            AnchorService.Instance.CurrentPlayerData.LastLogin += AnchorService.TIME_TO_REFILL_ENERGY;
            timePassed -= AnchorService.TIME_TO_REFILL_ENERGY;
        }

        var timeUntilNextRefill = AnchorService.TIME_TO_REFILL_ENERGY - timePassed;

        if (timeUntilNextRefill > 0)
        {
            NextEnergyInText.text = timeUntilNextRefill.ToString();
        }
        else
        {
            NextEnergyInText.text = "";
        }
        
        EnergyAmountText.text = AnchorService.Instance.CurrentPlayerData.Energy.ToString();
        WoodAmountText.text = AnchorService.Instance.CurrentPlayerData.Wood.ToString();
    }

    private void OnChuckWoodSessionButtonClicked()
    {
        ChuckWoodSessionButton.transform.localPosition = CharacterStartPosition;
        ChuckWoodSessionButton.transform.DOLocalMove(CharacterStartPosition + Vector3.up * 10, 0.3f);
        stopwatch.Stop();
        stopwatch.Start();
        AnchorService.Instance.ChopTree(!Web3.Rpc.NodeAddress.AbsoluteUri.Contains("localhost"), () =>
        {
            
        });
    }
}
